const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

class FakeClassList {
    constructor() { this.values = new Set(); }
    add(...values) { values.forEach((value) => this.values.add(value)); }
    contains(value) { return this.values.has(value); }
    toggle(value) { this.values.has(value) ? this.values.delete(value) : this.values.add(value); }
    get length() { return this.values.size; }
    get [0]() { return [...this.values][0]; }
}

class FakeElement {
    constructor(tagName = 'div') {
        this.tagName = tagName.toUpperCase();
        this.attributes = new Map();
        this.classList = new FakeClassList();
        this.style = {};
        this.children = [];
        this.parentNode = null;
        this.innerHTML = '';
        this.value = '';
    }
    get className() { return [...this.classList.values].join(' '); }
    set className(value) { this.classList = new FakeClassList(); this.classList.add(...String(value).split(/\s+/).filter(Boolean)); }
    setAttribute(name, value) { this.attributes.set(name, String(value)); if (name === 'type') this.type = String(value); }
    getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
    hasAttribute(name) { return this.attributes.has(name); }
    removeAttribute(name) { this.attributes.delete(name); }
    append(...nodes) { nodes.forEach((node) => { node.parentNode = this; this.children.push(node); }); }
    querySelector() { return null; }
    querySelectorAll() { return []; }
    addEventListener() {}
    dispatchEvent() { return true; }
}

class FakeFormData {
    constructor() { this.values = []; }
    append(key, value) { this.values.push([key, value]); }
    entries() { return this.values[Symbol.iterator](); }
    [Symbol.iterator]() { return this.entries(); }
}

class FakeBlob {}
class FakeFile extends FakeBlob { constructor(name) { super(); this.name = name; } }

function createContext() {
    const requests = [];
    const cookieJar = [];
    class FakeXHR {
        open(method, url) { this.method = method; this.url = url; }
        setRequestHeader() {}
        send(body) { this.body = body; requests.push(this); }
        respond(status, response) { this.status = status; this.response = response; this.onload(); }
    }
    const document = {
        body: new FakeElement('body'),
        documentElement: {contains: () => true},
        createElement: (tag) => new FakeElement(tag),
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: () => {},
        get cookie() { return cookieJar.join('; '); },
        set cookie(value) { cookieJar.push(value); }
    };
    const context = {
        window: null,
        document,
        Element: FakeElement,
        FormData: FakeFormData,
        Blob: FakeBlob,
        File: FakeFile,
        XMLHttpRequest: FakeXHR,
        URL,
        URLSearchParams,
        CSS: {escape: (value) => String(value)},
        CustomEvent: class { constructor(type, options) { this.type = type; Object.assign(this, options); } },
        setTimeout,
        clearTimeout,
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() { return true; },
        console: {log() {}, error() {}},
        location: {href: 'https://portfolio.test/page?old=value', search: '?old=value'},
        history: {pushState() {}, replaceState() {}},
        localStorage: {getItem() { return null; }, setItem() {}, removeItem() {}},
        requestAnimationFrame: () => 0,
        innerHeight: 800,
        IntersectionObserver: undefined
    };
    context.window = context;
    return {context: vm.createContext(context), requests};
}

function loadLibrary() {
    const {context, requests} = createContext();
    vm.runInContext(fs.readFileSync('public/assets/js/axnikitaJS.js', 'utf8'), context, {filename: 'axnikitaJS.js'});
    return {context, requests};
}

test('keeps legacy names and exposes the versioned API', () => {
    const {context} = loadLibrary();
    assert.equal(context.axnikitaJS.version, '3.0.1');
    for (const name of ['axNode', 'axRequest', 'axLoader', 'axQS', 'axQSA', 'axDate', 'axURL']) {
        assert.ok(context[name], `${name} is public`);
    }
});

test('axNode parses the historical tag syntax and supports axVal', () => {
    const {context} = loadLibrary();
    const node = new context.axNode('input.card.primary[type=text][data-id=42]');
    assert.equal(node.tagName, 'INPUT');
    assert.equal(node.className, 'card primary');
    assert.equal(node.getAttribute('data-id'), '42');
    node.axVal('new value');
    assert.equal(node.axVal(), 'new value');
});

test('axRequest does not mutate input and caches by actual request data', () => {
    const {context, requests} = loadLibrary();
    const request = new context.axRequest('/api', {type: 'auto', dataTemplate: {locale: 'ru'}, saveLoadData: true});
    const input = {page: 1};
    let response;
    request.execute(input, (value) => { response = value; });
    assert.deepEqual(input, {page: 1});
    assert.equal(requests.length, 1);
    assert.equal(requests[0].method, 'POST');
    requests[0].respond(200, 'first');
    assert.equal(response, 'first');
    request.execute({page: 1}, (value) => { response = value; });
    assert.equal(requests.length, 1);
    assert.equal(response, 'first');
    request.execute({page: 2}, () => {});
    assert.equal(requests.length, 2);
});

test('date, URL and cookie helpers work without undocumented globals', () => {
    const {context} = loadLibrary();
    assert.equal(new context.axDate().getSeconds(), Math.floor(Date.now() / 1000));
    const url = new context.axURL('/work?project=old').addGetParam('project', 'portfolio');
    assert.equal(url.urlPath, '/work?project=portfolio');
    context.axCookie.setValue('lang', 'ru');
    assert.equal(context.axCookie.getValue('lang'), 'ru');
    assert.equal(new context.axGet().getParam('old'), 'value');
});


test('axRequest auto defaults to GET for reads and POST for data', () => {
    const {context, requests} = loadLibrary();

    const read = new context.axRequest('/page');
    read.execute({}, () => {});
    assert.equal(requests.length, 1);
    assert.equal(requests[0].method, 'GET');

    const write = new context.axRequest('/api');
    write.execute({id: 42}, () => {});
    assert.equal(requests.length, 2);
    assert.equal(requests[1].method, 'POST');
});

test('axLoader single loads use GET while batch transport stays POST', () => {
    const {context, requests} = loadLibrary();

    context.axLoader.bufferCel.sendSingleRequest({
        url: '/web?domLoader=',
        params: {},
        callback: () => {},
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].method, 'GET');

    const batch = context.axLoader.bufferCel.getRequest();
    batch.execute({requests: [{url: '/a', params: {}}], separator: 'sep'}, () => {});
    assert.equal(requests.length, 2);
    assert.equal(requests[1].method, 'POST');
});
