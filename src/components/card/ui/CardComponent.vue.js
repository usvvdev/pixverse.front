import ButtonComponent from '@/components/button/ui/ButtonComponent.vue';
import LinkIcon from '@/app/assets/icons/LinkIcon.vue';
const __VLS_props = defineProps();
const appUrl = import.meta.env.VITE_APP_URL;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "base__card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "base__card-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "base__card-header__title" },
});
(__VLS_ctx.title);
if (__VLS_ctx.isDocs) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ class: "base__card-header__tag" },
        href: (`${__VLS_ctx.appUrl}/${__VLS_ctx.title}/docs`),
    });
    (__VLS_ctx.tag);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.className) },
});
var __VLS_0 = {};
if (__VLS_ctx.href) {
    /** @type {[typeof ButtonComponent, ]} */ ;
    // @ts-ignore
    const __VLS_2 = __VLS_asFunctionalComponent(ButtonComponent, new ButtonComponent({
        href: (__VLS_ctx.href),
        icon: (__VLS_ctx.LinkIcon),
    }));
    const __VLS_3 = __VLS_2({
        href: (__VLS_ctx.href),
        icon: (__VLS_ctx.LinkIcon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_2));
}
/** @type {__VLS_StyleScopedClasses['base__card']} */ ;
/** @type {__VLS_StyleScopedClasses['base__card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['base__card-header__title']} */ ;
/** @type {__VLS_StyleScopedClasses['base__card-header__tag']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ButtonComponent: ButtonComponent,
            LinkIcon: LinkIcon,
            appUrl: appUrl,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
