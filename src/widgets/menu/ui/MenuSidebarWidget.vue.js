import { useRouter } from 'vue-router';
import ButtonComponent from '@/components/button/ui/ButtonComponent.vue';
import useAuthStore from '@/app/providers/stores';
import { HomeIcon, ApplicationIcon, LogoutIcon } from '@/app/assets/icons';
const authStore = useAuthStore();
const router = useRouter();
const logout = async () => {
    await authStore.logout();
    await router.push('/');
};
const sidebarItems = {
    navigation: [
        { href: '/services', icon: HomeIcon },
        { href: '/applications', icon: ApplicationIcon },
    ],
    logout: [
        {
            icon: LogoutIcon,
            onClick: logout,
        },
    ],
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar__logo" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: ('/'),
    ...{ class: "sidebar__logo-title" },
}));
const __VLS_2 = __VLS_1({
    to: ('/'),
    ...{ class: "sidebar__logo-title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
for (const [items, section] of __VLS_getVForSourceType((__VLS_ctx.sidebarItems))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (section),
        ...{ class: (`sidebar__${section}`) },
    });
    for (const [item] of __VLS_getVForSourceType((items))) {
        /** @type {[typeof ButtonComponent, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(ButtonComponent, new ButtonComponent({
            key: (item.href),
            href: (item.href),
            icon: (item.icon),
            onClick: (item.onClick),
        }));
        const __VLS_5 = __VLS_4({
            key: (item.href),
            href: (item.href),
            icon: (item.icon),
            onClick: (item.onClick),
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    }
}
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar__logo']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar__logo-title']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ButtonComponent: ButtonComponent,
            sidebarItems: sidebarItems,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
