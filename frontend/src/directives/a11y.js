// 焦点管理指令
export const focus = {
    mounted(el) {
        el.focus();
    },
};
// 键盘导航指令
export const keyNav = {
    mounted(el, binding) {
        const handler = (e) => {
            if (binding.value && typeof binding.value === 'function') {
                binding.value(e);
            }
        };
        el.addEventListener('keydown', handler);
        el._keyNavHandler = handler;
    },
    unmounted(el) {
        if (el._keyNavHandler) {
            el.removeEventListener('keydown', el._keyNavHandler);
            delete el._keyNavHandler;
        }
    },
};
// ARIA 标签指令
export const aria = {
    mounted(el, binding) {
        if (binding.value) {
            Object.entries(binding.value).forEach(([key, value]) => {
                el.setAttribute(`aria-${key}`, value);
            });
        }
    },
    updated(el, binding) {
        if (binding.value) {
            Object.entries(binding.value).forEach(([key, value]) => {
                el.setAttribute(`aria-${key}`, value);
            });
        }
    },
};
// 跳过导航指令
export const skipNav = {
    mounted(el) {
        el.setAttribute('tabindex', '0');
        el.classList.add('skip-nav');
        el.addEventListener('click', () => {
            const main = document.querySelector('main');
            if (main) {
                main.setAttribute('tabindex', '-1');
                main.focus();
            }
        });
    },
};
//# sourceMappingURL=a11y.js.map