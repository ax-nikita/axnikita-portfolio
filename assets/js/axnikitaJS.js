const
    AX_LOADER_ATTR_SVG = window.AX_LOADER_ATTR_SVG = 'svgLoader',
    AX_LOADER_ATTR_EL = window.AX_LOADER_ATTR_EL = 'domLoader',
    AX_LOADER_ATTR_WAITING = window.AX_LOADER_ATTR_WAITING = 'awaiting',
    AX_LOADER_ATTR_SPA = window.AX_LOADER_ATTR_SPA = 'spa',
    AX_LOADER_ATTR_CACHE_TIME = window.AX_LOADER_ATTR_CACHE_TIME = 1000 * 60 * 60 * 24; // 1 день

window.ax_lib_info = {
    version: "2.31",
    last_update: "30.04.2022"
};

Object.defineProperty(Object.prototype, "reIndexArr", {
    enumerable: false,
    writable: true
});

Object.defineProperty(Array.prototype, "reIndexArr", {
    enumerable: false,
    writable: true
});

Object.prototype.reIndexArr = function () {
    return Object.values(this);
};

Array.prototype.reIndexArr = function () {
    let arr = [];
    this.forEach(e => {
        arr.push(e);
    });
    return arr;
};

function axQS(s) {
    return document.querySelector(s);
};

function axQSA(s) {
    return document.querySelectorAll(s);
};

function getSelectedRadioValue(form, radioName) {
    const radios = form.axQSA('[name="' + radioName + '"]');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null; // В случае, если ни одна кнопка не выбрана
}

function setRadioValue(form, radioName, value) {
    const radios = form.axQSA('[name="' + radioName + '"]');
    for (let i = 0; i < radios.length; i++) {
        if(radios[i].value === value) {
            radios[i].checked = true;
        } else  {
            radios[i].checked = false;
        }
    }
    return null; // В случае, если ни одна кнопка не выбрана
}

// Функция throttle будет принимать 2 аргумента:
// - callee, функция, которую надо вызывать;
// - timeout, интервал в мс, с которым следует пропускать вызовы.
function throttle(callee, timeout) {
    // Таймер будет определять,
    // надо ли нам пропускать текущий вызов.
    let timer = null

    // Как результат возвращаем другую функцию.
    // Это нужно, чтобы мы могли не менять другие части кода,
    // чуть позже мы увидим, как это помогает.
    return function perform(...args) {
        // Если таймер есть, то функция уже была вызвана,
        // и значит новый вызов следует пропустить.
        if (timer) return

        // Если таймера нет, значит мы можем вызвать функцию:
        timer = setTimeout(() => {
            // Аргументы передаём неизменными в функцию-аргумент:
            callee(...args)

            // По окончании сбрасываем таймер:
            timer = null
        }, timeout)
    }
}

axNode = class axNode {
    constructor(tag) {
        let
            node;

        if (tag.match(/[\[\.]/)) {
            let
                classes = [],
                attributes = [],

                classReg = /\.[\w-]+/g,
                attributeReg = /\[.+?]/g;

            classes = tag.match(classReg);
            tag = tag.replaceAll(classReg, '');

            attributes = tag.match(attributeReg);
            tag = tag.replaceAll(attributeReg, '');

            node = document.createElement(tag);

            if (classes && classes.length > 0) {
                classes = classes.map(cls => cls.slice(1));
                node.axClass(classes.join(' '));
            };

            if (attributes && attributes.length > 0) {
                attributes.forEach(attr => {
                    attr = attr.slice(1, -1);
                    attr = attr.split('=');
                    if (attr[1] === undefined) {
                        attr[1] = '';
                    }
                    ;
                    node.setAttribute(attr[0], attr[1]);
                });
            }
        } else {
            node = document.createElement(tag)
        }

        return node;
    };

    axClass(cls = null) {
        let
            d = this;
        if (typeof (d) != "object" || d.tagName == undefined)
            return false;
        if (cls !== null)
            d.className = cls;
        else
            return d.className;
        return d;
    };

    getTopParentNode() {
        let current = this;
        while (current.parentNode) {
            current = current.parentNode;
        }
        return current;
    }

    axVal(val = null) {
        switch (this.tagName) {
            case 'TEXTAREA':
            case 'INPUT':
                let
                    type = this.axAttribute('type');
                if (type === 'checkbox') {
                    this.baseValue = 'checked';
                } else if (type === 'radio') {
                    this.axVal = function (val = null) {
                        let
                            name = this.axAttribute('name');

                        if (val !== null) {
                            setRadioValue(this.form, name, val);
                            return this;
                        } else {
                            return getSelectedRadioValue(this.form, name);
                        };
                    };
                    return this.axVal(val);
                } else {
                    this.baseValue = 'value';
                }
                break;
            case 'IMG':
                this.baseValue = 'src';
                break;
            default:
                this.baseValue = 'innerHTML';
                break;
        }
        ;
        this.axVal = function (val = null) {
            if (val !== null) {
                this[this.baseValue] = val;
                return this;
            } else {
                return this[this.baseValue];
            }
            ;
        };
        return this.axVal(val);
    };

    axFlash(style = false, value = false, time = 160) {
        let
            node = this;
        if (style == 'tiktak12') {
            node.axFlashTimer--;
        } else if (node.axFlashTimer > 0) {
            node.axFlashTimer = 10;
            return;
        } else {
            node.axFlashStyle = [];
            node.axFlashType = '';
            node.axFlashVal = '';
            node.axFlashTimer = 10;
            if (!style) {
                style = "green";
                node.axFlashStyle = [
                    ['background-color', node.style['background-color']]
                ];
                node.style['background-color'] = style;
            } else {
                style = style.split(';');
                style.forEach(e => {
                    e = e.split(':');
                    if (e.length == 1) {
                        node.axFlashStyle.push(['background-color', node.style['background-color']]);
                        node.style['background-color'] = e[0];
                    } else {
                        node.axFlashStyle.push([e[0], node.style[e[0]]]);
                        node.style[e[0]] = e[1];
                    }
                    ;
                });
            }
            ;
            if (value !== false) {
                node.axFlashVal = node.innerHTML;
                if (node.axFlashVal === false) {
                    node.axFlashVal = '';
                }
                ;

                node.axVal(value);
                if (node.type == 'password') {
                    node.axFlashType = node.type;
                    node.type = 'text';
                }
                ;
            }
            ;
        }
        ;
        if (node.axFlashTimer <= 0) {
            node.axFlashStyle.forEach(e => {
                node.style[e[0]] = e[1];
            });
            if (node.axFlashType != '') {
                node.type = node.axFlashType;
            }
            ;

            if (value !== false) {
                node.innerHTML = node.axFlashVal;

            }

            node.axFlashTimer = 0;
        } else {
            setTimeout(() => {
                node.axFlash('tiktak12', value);
            }, time);
        }
        ;
    };

    axAttribute(name, value = undefined) {
        if (value === undefined) {
            return this.getAttribute(name);
        } else {
            this.setAttribute(name, value);
            return this;
        }
        ;
    };

    axQS(s) {
        return this.querySelector(s);
    };

    axQSA(s) {
        return this.querySelectorAll(s);
    };

    InDOM() {
        return document.body.contains(this);
    }

    componentLoader(exceptions = []) { // применяет автоматические функции только во внутренние элементы, без родительского
        let
            attributes = Object.keys(axComponentLoader.attributes),
            selector = [];

        attributes.forEach((v) => {
            if (!exceptions.includes(v)) {
                selector.push('[' + v + ']');
            }
        });

        this.axQSA(
            selector.join(',')
        ).forEach((el) => {
            attributes.forEach((attr) => {
                if (el.getAttribute(attr) !== null) {
                    axComponentLoader.attributes[attr].executeFunctions(el);
                }
                ;
            });
        });

        return this;
    };

    moduleLoader(exceptions = []) { // применяет автоматические функции к родителю и дочерним элементам
        let
            d = new axNode('div');

        this.replaceWith(d);
        d.append(this);
        d.componentLoader(exceptions);
        d.replaceWith(this);

        return this;
    }
};

axComponentLoader = class axComponentLoader {
    static attributes = {};

    static appendFunction(attr, func) {
        let
            attributes = axComponentLoader.attributes;
        if (attributes[attr] === undefined) {
            attributes[attr] = [func];
        } else {
            attributes[attr].push(func);
        }
    }
};

axComponentLoader.appendFunction(AX_LOADER_ATTR_SVG, (el) => {
    let
        node = (new axLoaderSVG(el.getAttribute(AX_LOADER_ATTR_SVG))).content;
    el.replaceWith(node);
});

axComponentLoader.appendFunction(AX_LOADER_ATTR_EL, (el) => {
    // Время в элементах всегда указываем в секундах
    let
        rewrite = el.axAttribute('rewrite'),
        cacheTime = el.axAttribute('cacheTime'),
        weight = el.axAttribute('requestWeight'),
        cache = el.axAttribute('cache'),
        params = {};

    if (rewrite) {
        let
            rewriteTime = Number(rewrite);

        if (rewriteTime) {
            params.rewriteTime = parseInt(rewrite * 1000);
        }
    }

    if (cacheTime) {
        cacheTime = Number(cacheTime);

        if (cacheTime) {
            params.useLocalStorage = true;
            params.cacheTime = parseInt(cacheTime * 1000);
        }
    }

    if (weight) {
        weight = Number(weight);

        if (weight) {
            params.weight = weight;
        }
    }

    if (cache) {
        params.useLocalStorage = true;
    }

    if (el.axAttribute('loadVisible')) {
        let
            removeF,
            f = () => {
                let elementTarget = el;
                let style = window.getComputedStyle(el);
                let displayStyle = style.display;

                if (displayStyle === 'none' || elementTarget.offsetWidth === 0) {
                    return;
                }

                let coords = elementTarget.getBoundingClientRect();
                let position = style.position;

                let isVisible = false;

                if (position === 'fixed') {
                    // fixed — проверяем строго попадание в экран
                    isVisible =
                        coords.bottom > 0 &&
                        coords.right > 0 &&
                        coords.top < window.innerHeight &&
                        coords.left < window.innerWidth;
                } else {
                    // обычные элементы — можно с запасом
                    isVisible = (window.innerHeight + 600) > coords.top;
                }

                if (isVisible) {
                    let href = el.getAttribute(AX_LOADER_ATTR_EL);

                    params.skeletonTag =
                        el.tagName +
                        (el.classList[0] ? '.' + el.classList[0] : '') +
                        '.loader';

                    let loader = new axLoader(href, params);
                    let node;

                    if (rewrite) {
                        loader.rewrite(elementTarget);
                    }

                    node = loader.content;

                    if (el.axClass()) {
                        node.axAttribute('class', el.axClass());
                    }

                    // вставляем скелет
                    if (node.hasAttribute(AX_LOADER_ATTR_WAITING) && el.innerHTML !== '') {
                        node.innerHTML = el.innerHTML + '';
                    }

                    el.replaceWith(node);

                    removeF();
                    f = () => {};
                }
            },
            timeout = el.axAttribute('loadVisible'),
            f1000 = throttle(f, 250);

        removeF = () => {
            window.removeEventListener("scroll", f1000);
            window.removeEventListener("click", f1000);
            document.removeEventListener("end_load_spa", f1000);
        }

        if (typeof(timeout) !== 'number') {
            timeout = 0;
        }

        setTimeout(() => {
            window.addEventListener("scroll", f1000);
            document.addEventListener("end_load_spa", f1000);
            window.addEventListener("click", f1000);
            f();
        }, timeout)

    } else {
        let
            loader = new axLoader(el.getAttribute(AX_LOADER_ATTR_EL), params),
            node;

        if (rewrite) {
            loader.rewrite();
        }

        node = loader.content

        el.replaceWith(node);
    }
});

axComponentLoader.appendFunction(AX_LOADER_ATTR_SPA, (el) => {
    el.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');

        if (href == '#') {
            return false;
        }

        const oldUrl = window.location.href;
        const url = new axURL(href, {
            save_history: true
        });

        url.update();
        url.addGetParam(AX_LOADER_ATTR_EL);

        const newMain = new axLoader(url.urlPath, {
            weight: 4
        });

        newMain.setSelector('main');

        newMain.addLeadUpFunction(() => {
            queueMicrotask(() => {
                document.dispatchEvent(
                    new CustomEvent('end_load_spa', {
                        detail: {
                            oldUrl,
                            url: window.location.href
                        }
                    })
                );

                document.documentElement.scrollTop = 0;
            });
        });

        axQS('main').replaceWith(newMain.content);
    });
});

axDataModuleElements = class axDataModuleElements {
    constructor(id) {
        this.elements = axQSA('[data-module~="' + id + '"]');
    }

    updateAll(func) {
        this.elements.forEach((el) => {
            func(el);
        });
    }

    removeAll() {
        this.elements.forEach((el) => {
            el.remove();
        });
    }
};

function setEvent_module_in_document(el) {
    if (el.module_function_counts > 1) {
        el.module_function_counts--;
        return;
    }

    let
        event = new CustomEvent("module_in_document", {el: el}); // (2)

    el.module_in_document_is_innit = true;

    if (el.InDOM()) {
        el.dispatchEvent(event);
    } else {
        const
            f_max_count = 40,
            time_phase = 5;

        let
            f_count = f_max_count,
            f_base_timeout = f_max_count * time_phase + time_phase,
            f = () => {
                if (el.InDOM()) {
                    el.dispatchEvent(event);
                } else if (f_count > 0) {
                    f_count -= 1;
                    setTimeout(f, f_base_timeout - f_count * time_phase);
                }
            };

        setTimeout(f, f_base_timeout - f_max_count * time_phase);
    }
}

axComponentLoader.appendFunction('data-module', (el) => {
    let
        mf = axModularFunction,
        ids = el.axAttribute('data-module').split(' ');

    el.module_function_counts = ids.length;

    ids.forEach(id => {
        if (typeof (mf.functions[id]) == 'object') {
            mf.functions[id].executeFunctions(el);
            setEvent_module_in_document(el);
        } else {
            if (!axModularFunction.waitingElements[id]) {
                axModularFunction.waitingElements[id] = [];
            }

            axModularFunction.waitingElements[id].push(el);
        }
    });
});

(() => {
    let
        obj = Object.getOwnPropertyNames(axNode.prototype);
    obj.forEach(method => {
        if (method !== 'constructor') {
            if(Element.prototype[method] && typeof (Element.prototype[method]) == 'function') {
                Element.prototype['__OLD_'+method] = Element.prototype[method];
            }

            Element.prototype[method] = axNode.prototype[method];
        }

    })
})();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

axRequest = class axRequest {
    baseDIR = ''; 					// базовый префикс для url
    type = 'auto'; 					// тип запроса auto/post/get
    responseType = 'text'; 	// responseType
    dataTemplate = {}; 			// Базовые параметры для dataTemplate
    saveLoadData = false; 	// Кеширование ответов
    headers = {}; 		// Заголовки
    static loadData = {};		// Ячейка хранения кеша

    // Функции

    onprogress = null;
    onerror = null;
    ontimeout = null;
    onhttperror = null

    // dir - куда отправляется запрос
    // obj - передаем настройки
    constructor(dir, obj = {}) {
        this.dir = dir;
        Object.assign(this, obj);
    };

    // удаояем кеш запроса
    clearSavedData() {
        this.constructor.loadData[this.baseDIR + this.dir] = {};
    };

    execute(data, func, errorFunc = null) {
        let
            xhr = new XMLHttpRequest(),
            dataKeys,
            href = this.baseDIR + this.dir,
            loadData,
            type = this.type;

        if (data instanceof FormData && type == "auto") {
            type = "POST";
        }

        if (typeof (data) == 'object' && !(data instanceof FormData)) {
            data = Object.assign(data, this.dataTemplate);

            if (Object.keys(data).length == 0) {
                if (type == "auto") {
                    type = "GET";
                }
            } else {
                if (type == "auto") {
                    type = "POST";
                }

                if (type == "GET") {
                    let url = new axURL(href);
                    url.addGetParamObj(data);
                    href = url.urlPath;
                } else if (!(data instanceof FormData)) {
                    data = data.toFormData();
                }
            }
        }

        xhr.open(type, href);

        for (const header in this.headers) {
            xhr.setRequestHeader(header, this.headers[header]);
        }

        if (this.saveLoadData) {
            dataKeys = Object.keys({});
            if (!this.constructor.loadData[href]) {
                this.constructor.loadData[href] = {};
            }

            loadData = this.constructor.loadData[href];

            if (dataKeys.done) {
                if (loadData.value) {
                    func(loadData.value);
                    return true;
                }
            } else {
                for (var key of dataKeys) {
                    let value = data.get(key);
                    if (!loadData[key]) {
                        loadData[key] = {};
                    }
                    loadData = loadData[key];
                    if (typeof (value) === 'object') {
                        value = JSON.stringify(value);
                    }
                    if (!loadData[value]) {
                        loadData[value] = {};
                    }

                    loadData = loadData[value];
                }
                if (loadData.value) {
                    func(loadData.value);
                    return true;
                }
            }
        }

        xhr.responseType = this.responseType;

        xhr.onload = () => {
            let xhrResponseData = xhr.response;

            if (xhr.status >= 200 && xhr.status < 300) {
                if (loadData) {
                    loadData.value = xhrResponseData;
                }

                func(xhrResponseData, xhr);

            } else {
                // HTTP ошибка (502, 503 и т.д.)
                if (typeof this.onhttperror === 'function') {
                    this.onhttperror({
                        type: 'http_error',
                        status: xhr.status,
                        xhr: xhr,
                        response: xhr.response
                    });
                }
            }
        };

        xhr.onerror = () => {
            if (typeof this.onerror === 'function') {
                this.onerror({
                    type: 'network_error',
                    status: xhr.status,
                    xhr: xhr
                });
            }
        };

        xhr.ontimeout = () => {
            if (typeof this.ontimeout === 'function') {
                this.ontimeout({
                    type: 'timeout',
                    status: xhr.status,
                    xhr: xhr
                });
            }
        };

        if (this.onprogress !== null) {
            xhr.onprogress = (event) => {
                let load = event.loaded / event.total;
                this.onprogress(load);
            };
        }

        xhr.send(data);

        return true;
    };
};

Object.defineProperty(Object.prototype, "toFormData", {
    enumerable: false,
    writable: true
});

Object.defineProperty(Array.prototype, "toFormData", {
    enumerable: false,
    writable: true
});

Object.defineProperty(FormData.prototype, "axAppend", {
    enumerable: false,
    writable: true
});

Object.prototype.toFormData = function (form = false, prefix = '') {
    if (!form) {
        form = new FormData();
    }

    for (const k in this) {
        form.axAppend(k, this[k], prefix);
    }
    ;

    return form
};

Array.prototype.toFormData = function (form = false, prefix = '') {
    if (!form) {
        form = new FormData();
    }

    this.forEach((v, k) => {
        form.axAppend(k, v, prefix);
    });
    return form;
};

FormData.prototype.axAppend = function (k, v, prefix = '') {
    if (prefix != '') {
        k = prefix + "[" + k + "]";
    }

    if (typeof (v) == 'object') {
        v.toFormData(this, k);
    } else {
        this.append(k, v);
    }
};

Object.defineProperty(Number.prototype, "prepareToString", {
    enumerable: false,
    writable: true
});

Number.prototype.prepareToString = function (length = 2, zero = '0') {
    return (zero.repeat(length - 1) + this).slice(-length);
};

axDate = class axDate {
    constructor(str = false) {
        this.date = str;
    }

    getSeconds() {
        return Math.floor(Date.now() / 1000);
    }

    getDataObj(mod = 0) {
        let
            str = this.date,
            thisDate;
        if (str) {
            str = str.replace(/\s+/g, 'T') + "Z";

            str = Date.parse(str) + mod;

            thisDate = new Date(str);
        } else {
            thisDate = new Date();
        }
        ;
        return thisDate;
    }

    getPHPServerDate() {
        return this.getPrepareDate(2, -(window.differenceDate ?? 0));
    }

    getPrepareDate(type = 1, mod = 0) {
        let
            thisDate = this.getDataObj(mod);

        let
            Minutes = thisDate.getMinutes().prepareToString(),
            Hours = thisDate.getHours().prepareToString(),
            Day = thisDate.getDate().prepareToString(),
            Month = (thisDate.getMonth() + 1).prepareToString(),
            Year = " " + thisDate.getFullYear();
        Year = Year[3] + Year[4];
        if (type == 1) return Hours + ":" + Minutes;
        if (type == 2) return Hours + ":" + Minutes + " " + Day + "." + Month + "." + Year;
    };
};

axGlossary = class axGlossary {
    static lib;
    static localStorageKey = 'glossary_';
    static glossariesPath = 'resources/glossaries/glossary_';

    static get(type, key, obj = false) {
        let
            string = this.lib[type][key];
        if (!string) {
            return key;
        }

        if (obj) {
            let
                r = new RegExp('%(' + Object.keys(obj).join('|') + ')%', 'gum'),
                replacer = (match, p1) => {
                    return obj[p1];
                };

            string = string.replace(r, replacer);
        }
        return string;
    }

    static load() {
        let
            data = localStorage[this.localStorageKey + axCookie.getValue('lang')];

        if (!data) {
            this.pullFromApi();
        } else {
            let
                dataObj = JSON.parse(data);

            if (dataObj.time > Date.now()) {
                this.lib = dataObj.data;
            } else {
                this.pullFromApi();
            }
        }
    }

    static pullFromApi() {
        if (!axCookie.getValue('lang')) {
            return;
        }
        let
            api = new axRequest(this.glossariesPath + axCookie.getValue('lang') + '.json');

        api.execute({}, (r) => {
            let data;
            try {
                data = {
                    time: Date.now() + 1440000,
                    data: JSON.parse(r)
                };
            } catch (error) {
                return;
            }

            localStorage.setItem(this.localStorageKey + axCookie.getValue('lang'), JSON.stringify(data));
            this.lib = data.data;
        });
    }
};

axNotification = class axNotification {
    static list = [];
    static glossary_class = axGlossary;

    static box(html) {
        let
            box = new axNode('div');

        box.innerHTML = html;
        box.classList.add('box-1', 'ax-notification');
        box.run = this.run;
        box.waiting = false;
        box.runtimer = this.runtimer;
        box.noti_class = this;

        return box;
    }

    static error(html = false, classname = false) {
        if (html === false) {
            html = this.glossary().get('main', 'message');
        }
        let
            box = this.box(html);

        box.classList.add('error');
        if (classname !== false) {
            box.classList.add(classname);
        }

        box.run();

        return box;
    }

    static glossary() {
        return this.glossary_class;
    }

    static message(html = false, classname = false) {
        if (html === false) {
            html = this.glossary().get('main', 'message');
        }

        let
            box = this.box(html);

        box.classList.add('message');
        if (classname !== false) {
            box.classList.add(classname);
        }

        box.run();

        return box;
    }

    static success(html = false, classname = false) {
        if (html === false) {
            html = this.glossary().get('main', 'success');
        }

        let
            box = this.box(html);

        box.classList.add('success');
        if (classname !== false) {
            box.classList.add(classname);
        }

        box.run();

        return box;
    }

    static warning(html = false, classname = false) {
        if (html === false) {
            html = this.glossary().get('main', 'warning');
        }

        let
            box = this.box(html);

        box.classList.add('warning');
        if (classname !== false) {
            box.classList.add(classname);
        }

        box.run();

        return box;
    }

    static append(el) {
        axQS('body').append(el);
        let
            height = el.clientHeight;
        this.list.forEach(element => {
            let
                bottom = parseInt(element.style['bottom']) + height + 10;

            element.style['bottom'] = bottom + 'px';
        });
        this.list.push(el);
    }

    static remove(el) {
        let
            index = this.list.indexOf(el);
        this.list.splice(index, 1);
        el.remove();
    }

    static wait(time) {
        this.waiting = true;
        setTimeout(() => {
            this.waiting = false;
        }, time);
    }

    static run() {
        let
            bottom = parseInt(this.style['bottom']);

        if (isNaN(bottom)) {
            this.style['opacity'] = 1;
            this.style['bottom'] = 10 + 'px';
            this.noti_class.append(this);
            window.addEventListener('mousemove', () => {
                setTimeout(() => {
                    this.run()
                }, 4000);
            }, {once: true});
        } else if (this.style['opacity'] < 0.01) {
            this.noti_class.remove(this);
        } else {
            if (this.waiting === false) {
                bottom += 10;
                this.style['bottom'] = bottom + 'px';
                this.style['opacity'] = this.style['opacity'] - (0.11 - (this.style['opacity'] / 15));
            }
            setTimeout(() => {
                this.run()
            }, 30);
        }
    }
};

axNodeConection = class axNodeConection {
    constructor(class1, class2, class3 = false, type = false) {
        let
            tags = [],
            tags2 = [];
        if (!class3) {
            class3 = 'active';
        }
        ;
        if (Array.isArray(class1)) class1.forEach(e => {
            tags = tags.concat(axQSA(e));
        });
        else tags = axQSA(class1);
        if (Array.isArray(class2)) class2.forEach(e => {
            tags2 = tags2.concat(axQSA(e));
        });
        else tags2 = axQSA(class2);
        if (tags == undefined || tags2 == undefined) return false;

        function axModalLoc() {
            tags2.forEach(e => {
                if (e.className == e.axModalClass) {
                    e.className += ' ' + class3;
                    if (type) document.addEventListener('click', () => {
                        e.className = e.axModalClass;
                    }, true);
                } else {
                    e.className = e.axModalClass;
                }
                ;
            });
        };

        tags2.forEach(e => {
            if (e.axModalClass == undefined) {
                e.axModalClass = e.className;
            }
            ;
        });

        tags.forEach(e => {
            e.addEventListener('click', axModalLoc);
        });
    };
};

axCookie = class axCookie {
    static getValue(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    static setValue(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        ;
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
            ;
        }
        ;
        document.cookie = updatedCookie;
    };

    static deleteCookie(name) {
        this.setValue(name, "", {
            'max-age': -1
        });
    };
};

axEvents = class axEvents {
    constructor() {
        this.optimizedResize();
    };

    optimizedResize() {
        var throttle = function (type, name, obj) {
            obj = obj || window;
            var running = false;
            var func = function () {
                if (running) {
                    return;
                }
                running = true;
                requestAnimationFrame(function () {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                })
            };
            obj.addEventListener(type, func);
        };
        throttle("resize", "optimizedResize");
    };
};

new axEvents;

axLazy = class axLazy {
    advance = 50;
    elements = [];

    constructor(selector) {
        axQSA(selector + '[lazy-src]').forEach(e => {
            let cords = e.getBoundingClientRect();
            if (Math.max(cords.left, cords.top) != 0 && cords.top - cords.height < window.innerHeight) {
                e.src = e.getAttribute('lazy-src');
            } else {
                if (axLazy.elements.length != 0) {
                    axLazy.elements.push(e);
                    this.InfinityLoad();
                    window.addEventListener('click', this.lazyDooble);
                    window.addEventListener('optimizedResize', this.lazyDooble);
                    window.addEventListener('wheel', this.lazyDooble);
                } else {
                    axLazy.elements.push(e);
                }
                ;
            }
            ;
        });
    };

    lazyLoad() {
        for (let i = 0; i < axLazy.elements.length; i++) {
            let e = axLazy.elements[i],
                cords = e.getBoundingClientRect();
            if (Math.max(cords.left, cords.top) != 0 && cords.top - cords.height + ((cords.height < 100) ? cords.height : 100) < window.innerHeight) {
                e.src = e.getAttribute('lazy-src');
                axLazy.elements.splice(i, 1);
                i--;
            }
            ;
        }
        ;
    };

    lazyDooble() {
        this.lazyLoad();
        setTimeout(this.lazyLoad, 50);
        setTimeout(this.lazyLoad, 150);
    };

    InfinityLoad() {
        this.lazyLoad();
        setTimeout(this.InfinityLoad, 200);
    };
};

String.prototype.convertToNode = function (sel = false, setting = {}) {
    let
        el = new axNode('div');
    el.innerHTML = this.trim();

    if (setting.axComponentLoader !== false) {
        el.componentLoader(setting.axComponentLoaderExceptions);
    }

    if (sel) {
        return el.axQSA(sel);
    } else {
        return [el.firstChild];
    }
    ;
};

baseAxLoader = class baseAxLoader {
    baseDIR = '';
    contentBuffer = {};
    idCounter = 0;
    skeletonTag = 'div';

    constructor(loader, obj = {}) {
        Object.assign(this, obj);
        Object.assign(loader, this);
        return obj;
    };
};

axLoader = class axLoader {
    selector = false;
    leadUpFunctions = [];
    cacheTime = AX_LOADER_ATTR_CACHE_TIME;
    replaceAwaitingElement = true;

    useLocalStorage = false;
    rewriteTime = 500; // кол-во миллисукунд когда буфер не может быть перезаписан после подгрузки
    weight = 1;

    leadUpFunction(node) {
        this.leadUpFunctions.executeFunctions(node);
        return node;
    };

    addLeadUpFunction(f) {
        this.leadUpFunctions.push(f);
        return this;
    };

    removeLeadUpFunction(f) {
        this.leadUpFunctions = this.leadUpFunctions.filter(fn => fn !== f);
    }

    saveInLocalStorage() {
        if (this.useLocalStorage) {
            const bufferCelData = {
                value: this.buffer.value,
                requestParam: this.buffer.requestParam,
                timestamp: Date.now()
            };
            localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(bufferCelData));
        }
    }

    getLocalStorageKey() {
        return this.dir + ':' + this.constructor.name + ':' + this.name;
    }

    loadContentBufferFromLocalStorage() {
        if (this.useLocalStorage) {
            if (this.buffer && this.buffer.value !== false) {
                return;
            }

            const bufferCelData = JSON.parse(localStorage.getItem(this.getLocalStorageKey()));
            const currentTime = Date.now();

            if (bufferCelData) {
                if (currentTime - bufferCelData.timestamp > this.cacheTime) {
                    localStorage.removeItem(this.getLocalStorageKey());
                } else {
                    this.buffer.value = bufferCelData.value;
                    this.buffer.requestParam = bufferCelData.requestParam;
                }
            }
        }
    }

    removeAllLeadUpFunctions() {
        this.leadUpFunctions = [];
    };

    constructor(name, obj = {}) {
        Object.assign(this, obj);
        this.name = name;
        this.dir = (obj.dir === undefined || obj.dir === false) ? this.constructor.baseDIR : obj.dir;
        if (obj.selector !== undefined) {
            this.setSelector(obj.selector);
        };
        if (obj.skeletonTag === undefined) {
            this.skeletonTag = this.constructor.skeletonTag;
        }
        return this;
    };

    get content() {
        if (!this.buffer) {
            this.buffer = new this.constructor.bufferCel(this);
        }

        this.loadContentBufferFromLocalStorage();

        let node = this.buffer.getPreparedValue(this);

        // save local params
        node.reload = this.reload;
        node.reloadAll = this.reloadAll;
        node.axLoader = this;

        return node;
    };

    reload() {
        let
            loader = this.axLoader,
            f = (newNode) => {
                this.replaceWith(newNode);
                loader.removeLeadUpFunction(f);
            };

        loader.addLeadUpFunction(f);

        return loader.content;
    };

    setSelector(sel = false) {
        this.selector = sel;
        if (/^[a-z]+$/.test(sel)) {
            this.skeletonTag = sel;
        } else {
            this.skeletonTag = this.constructor.skeletonTag;
        };
    };

    get buffer() {
        let buffer = this.constructor.contentBuffer;
        if (!buffer[this.dir]) {
            buffer[this.dir] = {};
        };
        return buffer[this.dir][this.name];
    }

    set buffer(e) {
        let buffer = this.constructor.contentBuffer;
        if (!buffer[this.dir]) {
            buffer[this.dir] = {};
        };
        buffer[this.dir][this.name] = e;
    }

    rewrite(forced = false) {
        if (this.buffer &&
            (forced || Date.now() - this.buffer.timestamp > this.rewriteTime)
        ) {
            this.buffer = undefined;
            localStorage.removeItem(this.getLocalStorageKey());

            return this.content;
        }
    };
};

new baseAxLoader(axLoader);

selectorsBuffer = class selectorsBuffer {
    value = false;
    buffer = {};

    getValue(obj, selector) {
        if (this.buffer[selector] == undefined || this.buffer[selector].value == undefined) {
            this.rememberValue(obj, selector);
            return obj.value.convertToNode(selector)[0];
        } else {
            return this.buffer[selector].value.convertToNode()[0];
        };
    };

    rememberValue(bufferCel, selector) {
        if (this.buffer[selector] == undefined || !this.buffer[selector].load) {
            let
                node = bufferCel.value.convertToNode(selector, {axComponentLoader: false})[0];

            this.buffer[selector] = {};
            this.buffer[selector].load = false;

            if (node === undefined) {
                console.error('Ошибка подгрузки ' + bufferCel.name + ' по селектору ' + bufferCel.selector);
                this.buffer[selector].value = (new axNode(bufferCel.skeletonTag)).outerHTML;
            } else if (node.nodeName === '#text') {
                this.buffer[selector].value = node.nodeValue;
            } else {
                this.buffer[selector].value = node.outerHTML;
            }
        };
    };

    clearBuffer() {
        this.buffer = {};
    };
};

axLoader.bufferCel = class {
    loading = false;
    value = false;
    nodeArray = [];
    preparedSelectorsBuffer = new selectorsBuffer;
    requestParam = {};

    constructor(obj) {
        Object.assign(this, obj);
        this.timestamp = Date.now();
    };

    get url() {
        return this.dir + this.name;
    };

    getPreparedValue(obj) {
        if (this.value === false && this.loading === false) {
            this.loading = true;

            axLoader.bufferCel.addToBatch({
                url: this.url,
                params: this.requestParam,
                weight: Number(obj.weight ?? 1),
                retries: 0,
                bufferCel: this,
                callback: (response) => {
                    if (this.loading === true) {
                        this.preparedSelectorsBuffer.clearBuffer();
                        this.value = response;
                        this.loading = false;

                        this.nodeArray.forEach(el => {
                            let newNode = this.getValue(el.static_loader_data);

                            newNode.reload = el.reload;
                            newNode.axLoader = el.axLoader;

                            let auto_class = el.axClass();

                            if (auto_class && auto_class !== 'loader') {
                                el.classList.remove('loader');
                                newNode.axClass(el.axClass());
                            }

                            if (el.axLoader.replaceAwaitingElement) {
                                el.replaceWith(newNode);
                            }
                        });

                        this.nodeArray = [];
                        obj.saveInLocalStorage();
                    }
                }
            });
        }

        return this.getValue(obj);
    };

    rewrite() {
        this.value = false;
        this.loading = false;
    };

    getValue(loader) {
        if (this.loading) {
            let newNode = new axNode(loader.skeletonTag);

            newNode.static_loader_data = {};
            newNode.static_loader_data.leadUpFunctions = loader.leadUpFunctions.slice();
            newNode.static_loader_data.leadUpFunction = loader.leadUpFunction;
            newNode.static_loader_data.selector = loader.selector;
            newNode.setAttribute(AX_LOADER_ATTR_WAITING, '');

            this.nodeArray.push(newNode);
            return newNode;
        } else {
            let
                node = loader.leadUpFunction(this.getNode(loader.selector)),
                event = new CustomEvent("afterleadUpFunction", {
                    detail: { element: node }
                });

            node.dispatchEvent(event);

            return node;
        }
    };

    getNode(selector) {
        return this.preparedSelectorsBuffer.getValue(this, selector);
    };

    static batchQueue = [];
    static nextQueue = [];
    static batchTimer = null;
    static batchDelay = 8;
    static maxBatchWeight = 8;

    static batchErrorWeightStep = 0.5;
    static maxRetries = 6;

    static getBatchWeight(queue = this.batchQueue) {
        return queue.reduce((sum, item) => {
            return sum + Number(item.weight ?? 1);
        }, 0);
    }

    static sendSingleRequest(request) {
        let simpleRequest = new axRequest(request.url);

        simpleRequest.onerror = (error) => {
            if (typeof request.onerror === 'function') {
                request.onerror(error);
            }
        };

        simpleRequest.ontimeout = (error) => {
            if (typeof request.ontimeout === 'function') {
                request.ontimeout(error);
            }
        };

        simpleRequest.onhttperror = (error) => {
            if (typeof request.onhttperror === 'function') {
                request.onhttperror(error);
            }
        };

        simpleRequest.execute(
            request.params || {},
            request.callback
        );
    }

    static increaseRequestWeight(request, step = null) {
        request.weight = Number(request.weight ?? 1) + Number(step ?? this.batchErrorWeightStep);
        return request.weight;
    }

    static requeueAfterBatchFailure(batch) {
        batch.forEach((request) => {
            request.retries = Number(request.retries ?? 0) + 1;
            this.increaseRequestWeight(request);

            if (request.retries >= this.maxRetries || request.weight > this.maxBatchWeight) {
                this.sendSingleRequest(request);
            } else {
                this.addToBatch(request);
            }
        });
    }

    static addToBatch(request) {
        request.weight = Number(request.weight ?? 1);
        request.retries = Number(request.retries ?? 0);

        if (request.weight > this.maxBatchWeight) {
            this.sendSingleRequest(request);
            return;
        }

        const currentWeight = this.getBatchWeight(this.batchQueue);

        if (currentWeight + request.weight > this.maxBatchWeight) {
            this.nextQueue.push(request);
            return;
        }

        this.batchQueue.push(request);

        const queueLength = this.batchQueue.length;
        const timeout = Math.max(1, this.batchDelay - queueLength);

        if (this.batchTimer) {
            clearTimeout(this.batchTimer);
        }

        this.batchTimer = setTimeout(() => this.sendBatch(), timeout);
    }

    static sendBatch() {
        if (this.batchQueue.length === 0) {
            this.batchTimer = null;
            return;
        }

        const batch = this.batchQueue;
        const nextBatch = this.nextQueue;
        const totalWeight = this.getBatchWeight(batch);

        this.batchQueue = [];
        this.nextQueue = [];
        this.batchTimer = null;

        if (batch.length <= 2 || totalWeight <= 2) {
            batch.forEach((request) => {
                this.sendSingleRequest(request);
            });

            nextBatch.forEach((nextRequest) => {
                this.addToBatch(nextRequest);
            });

            return;
        }

        const batchRequests = batch.map(item => ({
            url: item.url,
            params: item.params
        }));

        let
            request = axLoader.bufferCel.getRequest(),
            separator = generateRandomString(16, possibleCharacters);

        request.onhttperror = (error) => {
            this.requeueAfterBatchFailure(batch);

            nextBatch.forEach((nextRequest) => {
                this.addToBatch(nextRequest);
            });
        };

        request.onerror = (error) => {
            this.requeueAfterBatchFailure(batch);

            nextBatch.forEach((nextRequest) => {
                this.addToBatch(nextRequest);
            });
        };

        request.ontimeout = (error) => {
            this.requeueAfterBatchFailure(batch);

            nextBatch.forEach((nextRequest) => {
                this.addToBatch(nextRequest);
            });
        };

        request.execute(
            {
                requests: batchRequests,
                separator: separator
            },
            (response) => {
                response = response.split(separator);

                if (Array.isArray(response)) {
                    response.forEach((itemResponse, index) => {
                        const originalRequest = batch[index];

                        if (!originalRequest) {
                            return;
                        }

                        if (itemResponse === 'BatchRequestError') {
                            this.addToBatch(originalRequest);
                        } else if (typeof originalRequest.callback === 'function') {
                            originalRequest.callback(itemResponse);
                        }
                    });
                }

                nextBatch.forEach((nextRequest) => {
                    this.addToBatch(nextRequest);
                });
            }
        );
    }

    static executeRequestFunc = 'execute';

    static getRequest() {
        return new axRequest('/ajax/batch-loader', {type: 'post'});
    }
};

axLoaderSVG = class axLoaderSVG extends axLoader {
    requestParam = {};
    selector = 'svg';
    weight = 0.5;
    useLocalStorage = true;
};

new baseAxLoader(axLoaderSVG, {
    skeletonTag: 'svg'
});

axLoaderSVG.bufferCel = class extends axLoader.bufferCel {
    constructor(obj) {
        super(obj);
        if (this.name.match(/\.svg$/i) === null) {
            this.name += '.svg';
        }
        ;
    };
};

Object.defineProperty(Object.prototype, "axJoin", {
    enumerable: false,
    writable: true
});

Object.defineProperty(Array.prototype, "axJoin", {
    enumerable: false,
    writable: true
});

Object.prototype.axJoin = function (prefix = '', separator = '&') {
    let
        arr = [];

    for (const key in this) {
        arr.push(prefix + key + '=' + this[key]);
    }
    ;

    return arr.join(separator);
};

Array.prototype.axJoin = function (prefix = '', separator = '&') {
    let
        arr = [];

    this.forEach((e, i) => {
        arr.push(prefix + i + '=' + e);
    });

    return arr.join(separator);
};


Object.defineProperty(Object.prototype, "executeFunctions", {
    enumerable: false,
    writable: true
});

Object.defineProperty(Array.prototype, "executeFunctions", {
    enumerable: false,
    writable: true
});

Object.prototype.executeFunctions = function (arg) {
    for (const key in this) {
        this[key](arg)
    }
    ;
};

Array.prototype.executeFunctions = function (arg) {
    this.forEach(f => f(arg));
};

axFunction = class axFunction {
    constructor(f) {
        if (!axFunction.load) {
            axFunction.functions.push(f);
        } else {
            f();
        }
        ;
    };
};

axFunction.functions = [];
axFunction.load = false;

axURL = class axURL {
    save_history = false;
    title = false;

    constructor(urlPath, obj = {}) {
        this.urlPath = urlPath;
        Object.assign(this, obj);
    };

    update() {
        if (!this.save_history) {
            window.history.replaceState({}, "", this.urlPath);
        } else {
            window.history.pushState({}, "", this.urlPath);
        }
        ;
        if (this.title) {
            document.title = this.title;
        }
        ;
    };

    addGetParam(name, value) {
        let
            delimeter = '?',
            added = '';

        if (this.urlPath.indexOf('?') > -1) {
            delimeter = '&';
        }
        ;

        if (value === undefined) {
            added = delimeter + name;
        } else {
            added = delimeter + name + '=' + value;
        }
        ;

        this.urlPath += added;
        return this;
    }

    addGetParamObj(obj) {
        let
            delimeter = '?';

        if (this.urlPath.indexOf('?') > -1) {
            delimeter = '&';
        }
        ;

        this.urlPath += delimeter + obj.axJoin();

        return this;
    }
};

axGet = class axGet {
    constructor() {
        if (!this.params && window.location.href.match(/.*\?.*/)) {
            this.params = {};
            window.location.href.replace(/.*\?/, '').split('&').forEach(value => {
                let
                    tmp = value.split('=');
                this.params[tmp[0]] = tmp[1];
            });
        } else {
            this.getParam = () => {
                return undefined;
            }
        }
    };

    getParam(param) {
        return this.params[param];
    };
};

Number.prototype.axRange = function (a, b) {
    if (a < b) {
        return this >= a && this <= b;
    } else if (a > b) {
        return this <= a && this >= b;
    } else if (a == b) {
        return this == a;
    }
};

function generateRandomString(length, characters) {
    let result = '';
    const charactersLength = characters.length; // Длина строки-источника
    for (let i = 0; i < length; i++) {
        // Получаем случайный индекс от 0 до charactersLength - 1
        const randomIndex = Math.floor(Math.random() * charactersLength);
        // Добавляем случайный символ к результату
        result += characters.charAt(randomIndex);
    }
    return result;
}

// Пример использования:
const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Набор символов

axCanvasElement = class axCanvasElement {
    kill = false;
    color = '#000000';
    reactive = false;
    eventStopper = false;
    events = {};

    constructor(x = 0, y = 0, width = 10, height = 10) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawFunction(canvas) {
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    workFunctions(canvas) {
        this.drawFunction(canvas);
        this.updateFunction(canvas);
    }

    updateFunction(canvas) {
        return;
    }

    isThereCoord(x, y) {
        let
            el = this,
            bool = (x.axRange(el.x, el.x + el.width) && y.axRange(el.y, el.y + el.height));
        return bool;
    }
};

axJson = class axJson {
    static setting = {
        li: false,
        ul: false,
        all_tools: true,
        hidden_object: true,
        hidden_dell: false,
        hidden_add: false,
        hidden_type: false,
        edit_keys: false,
        edit_values: false,
        object_display_name_key: 'name',
        array_display_name_key: 0,
        depth_set: [],
        key_set: {}
    };

    constructor(jsonOrObj) {
        if (typeof (jsonOrObj) == 'object') {
            this.data = jsonOrObj;
        } else {
            this.data = JSON.parse(jsonOrObj);
        }
    }

    static ul(obj, setting = {}) {
        if (setting.depth === undefined) {
            setting.depth = 0;
        } else {
            setting.depth++;
        }

        let
            ul = new axNode('ul.ax-json'),
            keys = Object.keys(obj);

        if (Array.isArray(obj)) {
            ul.classList.toggle('ax-json-array');
        }

        for (const key of keys) {
            ul.append(axJson.li(key, obj[key], setting));
        }
        ul.append(axJson.liCreate(setting));

        ul.isArray = Array.isArray(obj);

        ul.getJsonObj = axJson.getJsonObj;

        ul.searchKey = function (key) {
            return Array.from(this.childNodes).filter((li) => {
                return li.classList.contains('ax-json__item') && li.childNodes[1].childNodes[0].value == key;
            })
        };
        return ul;
    }

    static getJsonObj() {
        let
            childs = this.childNodes,
            object = {};

        childs.forEach((li) => {
            if (li.classList.contains('ax-json__item')) {
                let
                    data = axJson.getJsonDataFromLi(li);
                object[data[0]] = data[1];
            }
        });

        if (this.isArray) {
            object = Object.values(object);
        }

        return object;
    }

    static getJsonDataFromLi(el) {
        let
            key_element = el.childNodes[1],
            value_element = el.childNodes[2],
            key = key_element.childNodes[0].value,
            type = key_element.childNodes[1].innerText,
            value;

        if (type == 'array' || type == 'object') {
            value = value_element.childNodes[1];
            value = value.getJsonObj();
        } else if (type == 'bool') {
            value = !!Number(value_element.childNodes[0].value);
        } else {
            value = value_element.childNodes[0];
            if (type == 'number') {
                value = Number(value.value);
            } else {
                value = value.value;
            }
        }
        return [key, value];
    }

    static liCreate(setting = {}) {
        let
            li = new axNode('li.ax-json__create-item'),
            button = new axNode('div.ax-json__create-button');

        button.innerText = 'add item +';

        button.addEventListener('click', function () {
            let
                data;

            if (li.previousElementSibling) {
                data = axJson.getJsonDataFromLi(li.previousElementSibling);
                if (li.parentElement.isArray) {
                    data[0]++;
                }
            } else {
                if (li.parentElement.isArray) {
                    data = [
                        '0',
                        'value'
                    ];
                } else {
                    data = [
                        'key_1',
                        'value'
                    ];
                }
            }


            li.before(axJson.li(data[0], data[1]));
        });

        li.append(button);

        return li;
    }

    static li(key, val, setting = {}) {
        let
            type = axJson.takeType(val),
            li = new axNode('li.ax-json__item'),
            key_element = new axNode('div.ax-json__key-container'),
            key_element_key = new axNode('input[type=text].ax-json__key-input'),
            key_element_type = new axNode('div.ax-json__type-item'),
            dell = new axNode('div.ax-json__dell-item');

        key_element_type.jsonType = type;

        key_element_type.addEventListener('click', function () {
            let
                valueTypes = axJson.valueTypes,
                idType = valueTypes.indexOf(this.jsonType) + 1,
                nextType = valueTypes[(idType >= valueTypes.length) ? 0 : idType],
                newValue = 0;

            if (this.oldJsonValue == undefined) {
                this.oldJsonValue = axJson.getJsonDataFromLi(li)[1];
                this.oldJsonValueType = this.jsonType;
            }

            newValue = this.oldJsonValue;

            li.classList.remove('ax-json__' + this.jsonType);
            li.classList.add('ax-json__' + nextType);

            if (this.oldJsonValueType == 'object') {
                if (nextType == 'array') {
                    newValue = Object.values(this.oldJsonValue);
                } else if (nextType != 'object') {
                    newValue = JSON.stringify(this.oldJsonValue[Object.keys(this.oldJsonValue)[0]]);
                }
            } else if (this.oldJsonValueType == 'array') {
                if (nextType == 'object') {
                    newValue = Object.assign({}, this.oldJsonValue);
                } else if (nextType != 'array') {
                    newValue = JSON.stringify(this.oldJsonValue[0]);
                }
            } else {
                if (nextType == 'array') {
                    newValue = [this.oldJsonValue];
                } else if (nextType == 'object') {
                    newValue = {key_1: this.oldJsonValue};
                }
            }

            key_element_type.jsonType = nextType;
            key_element_type.innerText = nextType;

            let
                newValueElement = axJson.liValue(newValue, setting, nextType);

            newValueElement.addEventListener('input', () => {
                delete this.oldJsonValue;
            }, {once: true});

            li.childNodes[2].replaceWith(newValueElement);
        });

        dell.addEventListener('click', () => {
            li.remove();
        });

        dell.innerText = 'x';

        key_element_key.value = key;
        key_element_type.innerText = type;
        li.classList.add('ax-json__' + type);

        key_element.append(key_element_key, key_element_type);

        li.append(dell, key_element);

        li.append(axJson.liValue(val, setting, type));
        return li;
    }

    static liValue(val, setting = {}, type = false) {
        let
            val_element = new axNode('div.ax-json__value-container');
        if (type == false) {
            type = axJson.takeType(val);
        }
        ;
        if (typeof (val) == 'object') {
            let
                show_button = new axNode('button.ax-json__show-button'),
                show_button_i = new axNode('span'),
                ul = axJson.ul(val, setting),
                display_name = new axNode('div.ax-json__display-obj-name');

            if (axJson.getSetting(setting, 'hidden_object') === true) {
                ul.classList.toggle('hidden');
            } else {
                show_button.classList.toggle('active');
            }

            show_button.addEventListener('click', (e) => {
                show_button.classList.toggle('active');
                ul.classList.toggle('hidden');
                if (e.isTrusted == false) {
                    return;
                }
                ul.axQSA('.ax-json__value-container > .ax-json__show-button.active').forEach((button) => {
                    button.click(false);
                });
            });

            show_button_i.innerText = '>';
            show_button.append(show_button_i);

            let
                nameKey = axJson.getSetting(setting, type + '_display_name_key');

            function replaceName() {
                display_name.innerText = this.value;
            };

            if (nameKey !== false) {
                ul.childNodes.forEach((el) => {
                    if (el.classList.contains('ax-json__item')) {
                        el.childNodes[1].childNodes[0].addEventListener('input', function () {
                            if (this.value == nameKey) {
                                el.childNodes[2].childNodes[0].addEventListener('input', replaceName);
                                display_name.innerText = el.childNodes[2].childNodes[0].value;
                            } else {
                                el.childNodes[2].childNodes[0].removeEventListener("mousedown", replaceName, false);
                                display_name.innerText = (ul.isArray) ? ':array:' : ':object:';
                            }
                        });
                        if (el.childNodes[1].childNodes[0].value == nameKey) {
                            el.childNodes[2].childNodes[0].addEventListener('input', replaceName);
                            display_name.innerText = el.childNodes[2].childNodes[0].value;
                        }
                        ;
                    }
                    ;
                });
                if (display_name.innerText == '') {
                    display_name.innerText = (ul.isArray) ? ':array:' : ':object:';
                }
            }
            ;

            show_button.append(display_name);

            val_element.append(show_button);
            val_element.append(ul);
        } else if (type == 'bool') {
            let
                select = new axNode('select.ax-json__value-input');
            select.innerHTML = "<option value='0'>false</option><option value='1'>true</option>";
            select.childNodes[val + 0].setAttribute('selected', true);
            val_element.append(select);
        } else {
            let
                input = new axNode('input[type=' + type + '].ax-json__value-input');
            input.value = val;
            val_element.append(input);
        }
        return val_element;
    }

    static takeType(val) {
        let
            type;

        if (typeof (val) == 'object') {
            if (Array.isArray(val)) {
                type = 'array';
            } else {
                type = 'object';
            }
        } else {
            if (typeof (val) == 'number') {
                type = 'number';
            } else if (/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(val)) {
                type = 'color';
            } else if (typeof (val) == 'boolean') {
                type = 'bool';
            } else {
                type = 'text';
            }
        }
        ;

        return type;
    }

    static getSetting(setting, prop) {
        if (setting.key && setting.key_set && setting.key_set[setting.key] && setting.key_set[setting.key][prop] !== undefined) {
            return setting.key_set[setting.key][prop];
        } else if (setting.depth_set && setting.depth_set[setting.depth] && setting.depth_set[setting.depth][prop] !== undefined) {
            return setting.depth_set[setting.depth][prop];
        }
        if (setting[prop] === undefined) {
            return axJson.setting[prop];
        } else {
            return setting[prop];
        }
    };

    static valueTypes = [
        'bool',
        'text',
        'number',
        'color',
        'array',
        'object'
    ];
};

axCE = axCanvasElement;

axCanvasElementSmart = class axCanvasElementSmart extends axCanvasElement {
    reactive = true;
    eventStopper = true;

    get hover() {
        return this.events.hover;
    }

    get click() {
        return this.events.click;
    }

    get mouseleave() {
        return this.events.mouseleave;
    }

    get mousemove() {
        return this.events.mousemove;
    }

    get mouseup() {
        return this.events.mouseup;
    }

    get mousedown() {
        return this.events.mousedown;
    }
};

axCanvasElementEvent = class axCanvasElementEvent {
    active = true;
    x;
    y;
    lifeTime = 1;
    stack = 1;

    constructor(obj = {}) {
        Object.assign(this, obj);
    }
};

axCES = axCanvasElementSmart;

eventStorage = class eventStorage {
    mousePosition;
    clickTrigger = 3;
    events = {};

    save(name, e) {
        let
            events = this.events;
        if (events['mouseleave']) {
            return;
        }
        switch (name) {
            case 'mousemove':
                this.mousePosition = e;
                if (events['mouseleave']) {
                    delete events['mouseleave'];
                }
                ;
                events['mousemove'] = e;
                break;

            case 'mousedown':
                if (events['mouseup']) {
                    delete events['mouseup'];
                }
                ;
                events['mousedown'] = e;
                break;

            case 'mouseup':
                if (events['mousedown']) {
                    if (parseInt(events['mousedown'].layerX / this.clickTrigger) == parseInt(e.layerX / this.clickTrigger))
                        events['click'] = e;
                    delete events['mousedown'];
                }
                ;

                events['mouseup'] = e;
                break;

            case 'mouseleave':
                events = {};
                this.mousePosition = false;
                events['mouseleave'] = e;
                break;

            default:
                break;
        }

    }

    reset() {
        if (this.events['mousedown']) {
            let
                event = this.events['mousedown'];
            this.events = {
                mouseup: event
            };
        } else {
            this.events = {};
        }

    }
};

axCanvas = class axCanvas {
    elements = [];
    fpsCounter = [];
    fpsCalculationLength = 90;
    showFPS = false;
    eventStorage = new eventStorage();

    constructor(selectorOrElement, width = false, hight = false) {
        if (typeof (selectorOrElement) == 'string') {
            this.element = axQS(selectorOrElement);
        } else {
            this.element = selectorOrElement;
        }
        this.ctx = this.element.getContext('2d');
        if (!width) {
            this.width = this.element.width = this.element.clientWidth;
            this.height = this.element.height = this.element.clientHeight;
        } else {
            this.width = this.element.width = width;
            this.height = this.element.height = hight;
        }
        this.repeat = true;
        this.eventsElements = [];

        this.render = () => {
            if (this.repeat) {
                requestAnimationFrame(this.render);

                this.now = Date.now();
                this.elapsed = this.now - this.then;

                if (this.elapsed > this.fpsInterval) {
                    this.then = this.now - (this.elapsed % this.fpsInterval);
                    this.print();

                    if (this.fpsCounter.length > this.fpsCalculationLength - 1) {
                        this.fpsCounter.shift();
                    }
                    ;
                    this.fpsCounter.push(this.now);

                    if (this.showFPS) {
                        this.printFPS();
                    }
                }
            }
        };

        this.sortFuncElements = function (a, b) {
            return a.y - b.y || a.x - b.x;
        };

        this.getCursorCoords = () => {
            return false;
        };

        let
            listenerEvents = [
                'mousemove',
                'mousedown',
                'mouseup',
                'mouseleave'
            ];

        listenerEvents.forEach((eventName) => {
            this.element.addEventListener(eventName, (e) => {
                this.eventStorage.save(eventName, e);
            });
        });
    }

    newElement(z = 0, x = 0, y = 0, width = 10, height = 10) {
        let
            element = new axCanvasElement(x, y, width, height);
        this.addElement(element, z);
        return element;
    }

    addElement(element, zIndex = 0) {
        if (!this.elements[zIndex]) {
            this.elements[zIndex] = [];
        }
        this.elements[zIndex].push(element);
        return this;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    stop() {
        this.repeat = false;
    }

    start(fps = 60) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.render();
    }

    print() {
        this.clear();

        this.eventEngine();
        this.elements.forEach((zGroups, i1) => {
            zGroups.sort(this.sortFuncElements);
            this.elements[i1] = zGroups;
            zGroups.forEach((el, i2) => {
                if (el.kill == false) {
                    el.workFunctions(this);
                } else {
                    this.elements[i1].splice(i2, 1);
                }
            });
        });
    }

    searchElementsByCoords(x, y, filter = false) {
        let
            elements = [];
        this.elements.forEach((zGroups, i1) => {
            elements[i1] = [];
            zGroups.forEach((el) => {
                if (el.isThereCoord(x, y)) {
                    if (filter) {
                        if (el[filter]) {
                            elements[i1].push(el);
                        }
                    } else {
                        elements[i1].push(el);
                    }
                }
            });
            elements[i1].sort(this.sortFuncElements);
        });

        return elements;
    }

    eventEngine() {
        let
            events = this.eventStorage.events,
            x,
            y;

        if (this.eventStorage.mousePosition) {
            events['hover'] = this.eventStorage.mousePosition;
        }
        ;

        if (this.eventStorage.mousePosition) {
            let
                coords = this.normalizeLayerCoordinates(this.eventStorage.mousePosition.layerX, this.eventStorage.mousePosition.layerY);
            x = coords[0];
            y = coords[1];
        }
        ;
        this.resetEvents();
        if (events['mouseleave'] || x === undefined) {
            let
                elementsArr = this.eventsElements,
                killEvent = [
                    'hover',
                    'mousedown',
                ];
            elementsArr.forEach((el, i) => {
                if (el.events['hover']) {
                    el.events['mouseleave'] = new axCanvasElementEvent({});
                }
                ;
                killEvent.forEach((event) => {
                    if (el.events[event]) {
                        delete el.events[event];
                    }
                    ;
                });
            });
        } else if (x != undefined) {
            let
                elements = this.searchElementsByCoords(x, y, 'reactive');
            if (events['mousemove']) {
                let
                    elementsArr = this.eventsElements;
                elementsArr.forEach((el) => {
                    if (el.events['hover'] && !el.isThereCoord(x, y)) {
                        delete el.events['hover'];

                        el.events['mouseleave'] = new axCanvasElementEvent({});
                    }
                    ;
                });
            }
            ;

            for (let i = elements.length - 1; i >= 0; i--) {
                let
                    zGroup = elements[i];
                if (zGroup)
                    for (let j = zGroup.length - 1; j >= 0; j--) {
                        let
                            element = zGroup[j];
                        if (events['click']) {
                            element.events['click'] = new axCanvasElementEvent({
                                x: x,
                                y: y
                            });
                        }
                        ;
                        if (events['mouseup']) {
                            if (element.events['mousedown']) {
                                if (
                                    element.events['mousedown'].stack < 3
                                    &&
                                    (parseInt(element.events['mousedown'].x / this.eventStorage.clickTrigger) == parseInt(x / this.eventStorage.clickTrigger))
                                ) {
                                    element.events['click'] = new axCanvasElementEvent({
                                        x: x,
                                        y: y
                                    });
                                }
                                ;
                                delete element.events['mousedown'];
                            }
                            ;
                            element.events['mouseup'] = new axCanvasElementEvent({
                                x: x,
                                y: y
                            });
                        }
                        ;
                        if (events['mousedown']) {
                            element.events['mousedown'] = new axCanvasElementEvent({
                                x: x,
                                y: y
                            });
                        }
                        ;
                        if (events['mousemove']) {
                            element.events['mousemove'] = new axCanvasElementEvent({
                                x: x,
                                y: y
                            });
                            element.events['hover'] = new axCanvasElementEvent();
                        } else if (events['hover']) {
                            element.events['hover'] = new axCanvasElementEvent();
                        }
                        ;

                        this.eventsElements.push(element);
                    }
            }
        }
        this.eventStorage.reset();
    }

    resetEvents() {
        let
            elementsArr = this.eventsElements,
            killEvent = [
                'click',
                'mousemove',
                'mouseup',
                'mouseleave'
            ],
            length = elementsArr.length;
        for (let i = 0; i < length; i++) {
            let
                el = elementsArr[i];
            killEvent.forEach((event) => {
                if (el.events[event]) {
                    delete el.events[event];
                }
            });
            if (Object.keys(el.events).length == 0) {
                elementsArr.splice(i, 1);
                i--;
                length = elementsArr.length;
            }
            ;
        }
        ;
        this.eventsElements = elementsArr;
    }

    printFPS() {
        this.ctx.font = '14px consolas';
        this.ctx.fillStyle = 'green';
        this.ctx.fillText(this.fps() + ' fps', this.width - 55, 14);
    }

    normalizeLayerCoordinates(layerX, layerY) {
        let
            x = Math.round(layerX / this.element.clientWidth * this.width),
            y = Math.round(layerY / this.element.clientHeight * this.height);
        return [x, y];
    }

    fps() {
        let
            l = this.fpsCounter.length;
        if (l < 5) {
            return 30;
        }
        let
            time = this.fpsCounter[l - 1] - this.fpsCounter[0],
            fps = parseInt(1000 / (time / l));
        return fps;
    }
};

axModularFunction = class axModularFunction {
    static functions = {};
    static waitingElements = {};

    constructor(id, func) {
        let
            mf = axModularFunction;
        if (typeof (mf.functions[id]) != 'object') {
            mf.functions[id] = [];
            if (mf.waitingElements[id]) {
                mf.waitingElements[id].forEach((el) => {
                    func(el);
                    setEvent_module_in_document(el);
                });
            }
        }
        mf.functions[id].push(func);
        return true;
    }
};

new axModularFunction('ax_date', (el) => {
    let
        date = new axDate(el.innerText),
        dateType = el.getAttribute('type');

    const datePrint = document.createTextNode(date.getPrepareDate(dateType, window.differenceDate ?? 0));
    el.after(datePrint);
    el.remove();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log('AxNikita JS ' + window.ax_lib_info.version + ' ' + window.ax_lib_info.last_update);
    axFunction.functions.executeFunctions();
    axQS('body').componentLoader();
    axFunction.load = true;
});

/**
 * axnikitaJS compatibility core.
 *
 * The historical library is intentionally kept above this block so an existing
 * page can continue to use every public symbol.  The facade below replaces the
 * infrastructure used by portfolio sites with small, independently testable
 * services while retaining the original names and calling conventions.
 *
 * @version 3.0.1
 */
(() => {
    'use strict';

    const root = window;
    const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

    /** Converts a nested object into FormData without extending Object.prototype internally. */
    const appendFormData = (formData, key, value) => {
        if (value === null || value === undefined) {
            formData.append(key, '');
            return;
        }

        if (value instanceof Blob || value instanceof File || typeof value !== 'object') {
            formData.append(key, value);
            return;
        }

        Object.entries(value).forEach(([childKey, childValue]) => {
            appendFormData(formData, `${key}[${childKey}]`, childValue);
        });
    };

    const toFormData = (data) => {
        if (data instanceof FormData) {
            return data;
        }

        const formData = new FormData();
        Object.entries(data ?? {}).forEach(([key, value]) => appendFormData(formData, key, value));
        return formData;
    };

    const serialiseRequestData = (data) => {
        if (data instanceof FormData) {
            return [...data.entries()]
                .map(([key, value]) => [key, value instanceof File ? value.name : String(value)])
                .sort(([left], [right]) => left.localeCompare(right));
        }
        return Object.entries(data ?? {}).sort(([left], [right]) => left.localeCompare(right));
    };

    /** Creates an element from legacy syntax: `div.card[data-id=42]`. */
    class AxNode {
        constructor(tag = 'div') {
            if (typeof tag !== 'string' || tag.trim() === '') {
                throw new TypeError('axNode expects a non-empty tag string.');
            }

            const attributes = [...tag.matchAll(/\[([^\]]+)]/g)];
            const classes = [...tag.matchAll(/\.([\w-]+)/g)].map((match) => match[1]);
            const tagName = tag.replace(/\[[^\]]+]/g, '').replace(/\.[\w-]+/g, '') || 'div';
            const node = document.createElement(tagName);

            if (classes.length > 0) {
                node.classList.add(...classes);
            }

            attributes.forEach((match) => {
                const separatorIndex = match[1].indexOf('=');
                const name = separatorIndex === -1 ? match[1] : match[1].slice(0, separatorIndex);
                const value = separatorIndex === -1 ? '' : match[1].slice(separatorIndex + 1).replace(/^['\"]|['\"]$/g, '');
                node.setAttribute(name, value);
            });

            return node;
        }

        axClass(className = null) {
            if (className === null) {
                return this.className;
            }
            this.className = className;
            return this;
        }

        axAttribute(name, value = undefined) {
            if (value === undefined) {
                return this.getAttribute(name);
            }
            this.setAttribute(name, value);
            return this;
        }

        axQS(selector) {
            return this.querySelector(selector);
        }

        axQSA(selector) {
            return this.querySelectorAll(selector);
        }

        getTopParentNode() {
            let parent = this;
            while (parent.parentNode) {
                parent = parent.parentNode;
            }
            return parent;
        }

        InDOM() {
            return document.documentElement.contains(this);
        }

        axVal(value = null) {
            const inputType = this.getAttribute?.('type');
            if (inputType === 'radio') {
                const radios = this.form?.querySelectorAll(`[name="${CSS.escape(this.name)}"]`) ?? [];
                if (value === null) {
                    return [...radios].find((radio) => radio.checked)?.value ?? null;
                }
                radios.forEach((radio) => {
                    radio.checked = radio.value === String(value);
                });
                return this;
            }

            const property = inputType === 'checkbox' ? 'checked' :
                ['INPUT', 'TEXTAREA', 'SELECT'].includes(this.tagName) ? 'value' :
                    this.tagName === 'IMG' ? 'src' : 'innerHTML';
            if (value === null) {
                return this[property];
            }
            this[property] = value;
            return this;
        }

        axFlash(style = 'green', value = false, duration = 160) {
            const originalStyle = this.getAttribute('style');
            const originalValue = value === false ? undefined : this.axVal();
            this.style.cssText += `;${style.includes(':') ? style : `background-color:${style}`}`;
            if (value !== false) {
                this.axVal(value);
            }
            setTimeout(() => {
                if (originalStyle === null) this.removeAttribute('style');
                else this.setAttribute('style', originalStyle);
                if (originalValue !== undefined) this.axVal(originalValue);
            }, duration);
            return this;
        }

        componentLoader(exceptions = []) {
            const attributes = Object.keys(root.axComponentLoader?.attributes ?? {});
            const selector = attributes.filter((attribute) => !exceptions.includes(attribute))
                .map((attribute) => `[${attribute}]`).join(',');
            if (!selector) return this;

            this.querySelectorAll(selector).forEach((element) => {
                attributes.forEach((attribute) => {
                    if (!exceptions.includes(attribute) && element.hasAttribute(attribute)) {
                        root.axComponentLoader.attributes[attribute].executeFunctions(element);
                    }
                });
            });
            return this;
        }

        moduleLoader(exceptions = []) {
            const attributes = Object.keys(root.axComponentLoader?.attributes ?? {});
            attributes.forEach((attribute) => {
                if (!exceptions.includes(attribute) && this.hasAttribute?.(attribute)) {
                    root.axComponentLoader.attributes[attribute].executeFunctions(this);
                }
            });
            this.componentLoader(exceptions);
            return this;
        }
    }

    /** XHR adapter kept callback-first for legacy pages, with deterministic response caching. */
    class AxRequest {
        static loadData = Object.create(null);
        baseDIR = '';
        type = 'auto';
        responseType = 'text';
        dataTemplate = {};
        saveLoadData = false;
        headers = {};
        onprogress = null;
        onerror = null;
        ontimeout = null;
        onhttperror = null;

        constructor(dir, options = {}) {
            this.dir = dir;
            Object.assign(this, options);
        }

        clearSavedData() {
            const prefix = `${this.baseDIR}${this.dir}|`;
            Object.keys(this.constructor.loadData).forEach((key) => {
                if (key.startsWith(prefix)) delete this.constructor.loadData[key];
            });
        }

        execute(data = {}, callback = () => {}, errorCallback = null) {
            const requestData = data instanceof FormData ? data : {...this.dataTemplate, ...(data ?? {})};
            let method = String(this.type || 'auto').toUpperCase();
            if (method === 'AUTO') method = Object.keys(requestData instanceof FormData ? Object.fromEntries(requestData) : requestData).length ? 'POST' : 'GET';

            let href = `${this.baseDIR}${this.dir}`;
            let body = null;
            if (method === 'GET') {
                const url = new URL(href, root.location.href);
                const query = requestData instanceof FormData ? Object.fromEntries(requestData) : requestData;
                Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, String(value)));
                href = url.href;
            } else {
                body = toFormData(requestData);
            }

            const cacheKey = `${this.baseDIR}${this.dir}|${method}|${JSON.stringify(serialiseRequestData(requestData))}`;
            if (this.saveLoadData && hasOwn(this.constructor.loadData, cacheKey)) {
                callback(this.constructor.loadData[cacheKey], null);
                return true;
            }

            const xhr = new XMLHttpRequest();
            xhr.open(method, href, true);
            Object.entries(this.headers).forEach(([header, value]) => xhr.setRequestHeader(header, value));
            xhr.responseType = this.responseType;
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (this.saveLoadData) this.constructor.loadData[cacheKey] = xhr.response;
                    callback(xhr.response, xhr);
                    return;
                }
                const error = {type: 'http_error', status: xhr.status, xhr, response: xhr.response};
                this.onhttperror?.(error);
                errorCallback?.(error);
            };
            xhr.onerror = () => {
                const error = {type: 'network_error', status: xhr.status, xhr};
                this.onerror?.(error);
                errorCallback?.(error);
            };
            xhr.ontimeout = () => {
                const error = {type: 'timeout', status: xhr.status, xhr};
                this.ontimeout?.(error);
                errorCallback?.(error);
            };
            if (typeof this.onprogress === 'function') {
                xhr.onprogress = (event) => this.onprogress(event.lengthComputable ? event.loaded / event.total : 0);
            }
            xhr.send(body);
            return true;
        }
    }

    class AxDate {
        constructor(value = false) {
            this.date = value;
        }

        getSeconds() {
            return Math.floor(Date.now() / 1000);
        }

        getDataObj(offsetMs = 0) {
            if (!this.date) return new Date(Date.now() + offsetMs);
            const normalized = String(this.date).includes('T') ? String(this.date) : String(this.date).replace(/\s+/, 'T');
            const timestamp = Date.parse(normalized.endsWith('Z') ? normalized : `${normalized}Z`);
            return new Date(timestamp + offsetMs);
        }

        getPHPServerDate() {
            return this.getPrepareDate(2, -(root.axnikitaJS?.config.serverTimeOffsetMs ?? 0));
        }

        getPrepareDate(type = 1, offsetMs = 0) {
            const date = this.getDataObj(offsetMs);
            const pad = (value) => String(value).padStart(2, '0');
            if (type === 1) return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
            if (type === 2) return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`;
            return undefined;
        }
    }

    class AxCookie {
        static getValue(name) {
            const prefix = `${encodeURIComponent(name)}=`;
            const item = document.cookie.split('; ').find((cookie) => cookie.startsWith(prefix));
            return item ? decodeURIComponent(item.slice(prefix.length)) : undefined;
        }

        static setValue(name, value, options = {}) {
            const settings = {path: '/', ...options};
            const serializedOptions = Object.entries(settings).map(([key, optionValue]) => {
                const value = optionValue instanceof Date ? optionValue.toUTCString() : optionValue;
                return value === true ? key : `${key}=${value}`;
            });
            document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${serializedOptions.join('; ')}`;
        }

        static deleteCookie(name, options = {}) {
            this.setValue(name, '', {...options, 'max-age': -1});
        }
    }

    class AxURL {
        save_history = false;
        title = false;

        constructor(urlPath, options = {}) {
            this.urlPath = urlPath;
            Object.assign(this, options);
        }

        update() {
            const method = this.save_history ? 'pushState' : 'replaceState';
            root.history[method]({}, '', this.urlPath);
            if (this.title) document.title = this.title;
            return this;
        }

        addGetParam(name, value = undefined) {
            const url = new URL(this.urlPath, root.location.href);
            if (value === undefined) url.searchParams.set(name, '');
            else url.searchParams.set(name, value);
            this.urlPath = url.pathname + url.search + url.hash;
            return this;
        }

        addGetParamObj(params) {
            Object.entries(params).forEach(([key, value]) => this.addGetParam(key, value));
            return this;
        }
    }

    class AxGet {
        constructor() {
            this.params = Object.fromEntries(new URLSearchParams(root.location.search));
        }

        getParam(param) {
            return this.params[param];
        }
    }

    class AxLazy {
        static elements = new Set();
        static observer = null;

        constructor(selector = '') {
            const elements = document.querySelectorAll(`${selector}[lazy-src]`);
            if (typeof root.IntersectionObserver === 'function') {
                AxLazy.observer ??= new IntersectionObserver((entries) => {
                    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
                        AxLazy.load(entry.target);
                        AxLazy.observer.unobserve(entry.target);
                    });
                }, {rootMargin: '150px'});
                elements.forEach((element) => AxLazy.observer.observe(element));
            } else {
                elements.forEach((element) => AxLazy.elements.add(element));
                this.lazyLoad();
                root.addEventListener('scroll', () => this.lazyLoad(), {passive: true});
                root.addEventListener('resize', () => this.lazyLoad(), {passive: true});
            }
        }

        static load(element) {
            element.src = element.getAttribute('lazy-src');
            element.removeAttribute('lazy-src');
            AxLazy.elements.delete(element);
        }

        lazyLoad() {
            AxLazy.elements.forEach((element) => {
                if (element.getBoundingClientRect().top <= root.innerHeight + 150) AxLazy.load(element);
            });
        }

        lazyDooble() { this.lazyLoad(); }
        InfinityLoad() { this.lazyLoad(); }
    }

    const axQS = (selector) => document.querySelector(selector);
    const axQSA = (selector) => document.querySelectorAll(selector);
    const getSelectedRadioValue = (form, radioName) => form?.querySelector(`[name="${CSS.escape(radioName)}"]:checked`)?.value ?? null;
    const setRadioValue = (form, radioName, value) => {
        form?.querySelectorAll(`[name="${CSS.escape(radioName)}"]`).forEach((radio) => {
            radio.checked = radio.value === String(value);
        });
        return null;
    };
    const throttle = (callback, timeout) => {
        let timeoutId = null;
        return function throttled(...args) {
            if (timeoutId !== null) return;
            timeoutId = root.setTimeout(() => {
                timeoutId = null;
                callback.apply(this, args);
            }, timeout);
        };
    };

    // Preserve legacy extensions, but keep them non-enumerable and correctly scoped.
    const defineLegacyMethod = (prototype, name, method) => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
        if (descriptor && !descriptor.configurable) {
            if (!descriptor.writable) {
                throw new TypeError(`Cannot install legacy method ${name}: property is read-only.`);
            }
            prototype[name] = method;
            return;
        }
        Object.defineProperty(prototype, name, {configurable: true, enumerable: false, writable: true, value: method});
    };
    defineLegacyMethod(Object.prototype, 'reIndexArr', function reIndexArr() { return Object.values(this); });
    defineLegacyMethod(Array.prototype, 'reIndexArr', function reIndexArr() { return [...this]; });
    defineLegacyMethod(Object.prototype, 'toFormData', function objectToFormData(form = false, prefix = '') {
        const result = form || new FormData();
        Object.entries(this).forEach(([key, value]) => appendFormData(result, prefix ? `${prefix}[${key}]` : key, value));
        return result;
    });
    defineLegacyMethod(Array.prototype, 'toFormData', function arrayToFormData(form = false, prefix = '') {
        return Object.prototype.toFormData.call(this, form, prefix);
    });
    defineLegacyMethod(FormData.prototype, 'axAppend', function axAppend(key, value, prefix = '') {
        appendFormData(this, prefix ? `${prefix}[${key}]` : key, value);
        return this;
    });
    defineLegacyMethod(Number.prototype, 'prepareToString', function prepareToString(length = 2, zero = '0') { return String(this).padStart(length, zero); });
    defineLegacyMethod(Number.prototype, 'axRange', function axRange(a, b) { return this >= Math.min(a, b) && this <= Math.max(a, b); });
    defineLegacyMethod(Object.prototype, 'axJoin', function axJoin(prefix = '', separator = '&') {
        return new URLSearchParams(Object.entries(this).map(([key, value]) => [`${prefix}${key}`, String(value)])).toString().replace(/&/g, separator);
    });
    defineLegacyMethod(Array.prototype, 'axJoin', function axJoin(prefix = '', separator = '&') {
        return new URLSearchParams(this.map((value, index) => [`${prefix}${index}`, String(value)])).toString().replace(/&/g, separator);
    });
    defineLegacyMethod(Object.prototype, 'executeFunctions', function executeFunctions(argument) {
        Object.values(this).filter((value) => typeof value === 'function').forEach((callback) => callback(argument));
    });
    defineLegacyMethod(Array.prototype, 'executeFunctions', function executeFunctions(argument) {
        this.filter((callback) => typeof callback === 'function').forEach((callback) => callback(argument));
    });
    defineLegacyMethod(String.prototype, 'convertToNode', function convertToNode(selector = false, settings = {}) {
        const container = new AxNode('div');
        container.innerHTML = this.trim();
        if (settings.axComponentLoader !== false) container.componentLoader(settings.axComponentLoaderExceptions);
        return selector ? container.querySelectorAll(selector) : [container.firstChild];
    });

    Object.getOwnPropertyNames(AxNode.prototype).forEach((method) => {
        if (method !== 'constructor') defineLegacyMethod(Element.prototype, method, AxNode.prototype[method]);
    });

    const api = Object.freeze({
        version: '3.0.1',
        config: {serverTimeOffsetMs: 0},
        utils: Object.freeze({appendFormData, toFormData, throttle}),
        classes: Object.freeze({axNode: AxNode, axRequest: AxRequest, axDate: AxDate, axCookie: AxCookie, axURL: AxURL, axGet: AxGet, axLazy: AxLazy})
    });

    root.axnikitaJS = api;
    root.ax_lib_info = {version: api.version, last_update: '26.08.2026'};
    Object.assign(root, {axNode: AxNode, axRequest: AxRequest, axDate: AxDate, axCookie: AxCookie, axURL: AxURL, axGet: AxGet, axLazy: AxLazy, axQS, axQSA, getSelectedRadioValue, setRadioValue, throttle});
})();
