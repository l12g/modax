import { isNumber, isBoolean, isArray } from './utils';

const tpl = `
<div class='mx'>
    <div class='mx__title'></div>
    <div class='mx__body'>
        <div class='mx__content'></div>
    </div>
    <div class='mx__footer'></div>
</div>
`
let toastContainer;

function makeReactive(data, key, value, setter) {
    Object.defineProperty(data, '_' + key, {
        configurable: true,
        get() {
            return value;
        },
        set(val) {
            if (val === value) {
                return;
            }
            if (val !== val) {
                return;
            }
            if (setter) {
                value = setter(key, val) || val;
                return;
            }
            value = val;
        }
    })
}
export function initDom() {
    const el = document.createElement('div');
    el.className = 'mx-overlay';
    el.innerHTML = tpl;

    ['title', 'content', 'footer'].forEach(k => {
        makeReactive(this, k, this[k], (key, val) => {
            try {
                const dom = el.querySelector('.mx__' + key);
                dom.innerHTML = val;
                if (isBoolean(val) && !val && key === 'title') {
                    dom.remove();
                }
            } catch{

            }
        });
    });
    ['width', 'height'].forEach(k => {
        makeReactive(this, k, undefined, (key, val) => {
            el.querySelector('.mx').style[k] = isNumber(val) ? (val + 'px') : val;
        });
    });

    makeReactive(this, 'actions', undefined, (key, val) => {
        const footer = el.querySelector('.mx__footer');
        if (isBoolean(val) && !val) {
            footer.style.display = 'none';
            return;
        }
        const arr = (isArray(val) ? val : [val]);
        footer.innerHTML = arr.map((b, index) => {
            if (isBoolean(b.visible) && !b.visible) {
                return '';
            }
            return `<span class='mx__btn mx__btn--${b.type}' ${b.loading ? 'disabled' : ''}
            data-type='${b.type}' 
            data-index='${index}'>${b.loading ? "<div class='mx__loading'><span/></div>" : ""}${b.text}</span>`
        }).join('');
        return arr;
    });
    makeReactive(this, 'toast', undefined, (key, val) => {
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'mx-toast-wrap';
            document.body.appendChild(toastContainer);
        }
        this._container = toastContainer;
        el.className = 'mx-toast';
        el.innerHTML = `<span class='mx-toast__content'>${val}</span>`;
    });
    makeReactive(this, 'loading', undefined, (key, val) => {
        console.log(val);
        if (val) {
            el.style.background = 'rgba(255,255,255,.3)';
            el.innerHTML = `<div class="mx__loading-wrapper">
            <div class="mx__loading"><span/></div>
            <p class="mx__loading-text">${val.text}</p> 
           </div>`;
        }
    })


    return el;
}