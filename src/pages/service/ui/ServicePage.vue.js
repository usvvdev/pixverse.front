import MainLayout from '@/app/layouts/main/ui/MainLayout.vue';
import CardComponent from '@/components/card/ui/CardComponent.vue';
import MenuSidebarWidget from '@/widgets/menu/ui/MenuSidebarWidget.vue';
import { AuthUserController } from '@/services/api/controllers/auth/controller';
import { useController } from '@/services/composables/apiRetry';
const token = localStorage.getItem('access_token');
const tokenType = localStorage.getItem('token_type');
const controller = new AuthUserController({
    headers: {
        Authorization: `${tokenType} ${token}`,
    },
});
const services = useController(controller, async () => {
    const response = await controller.services.get();
    return response.items;
}, 'services');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof MainLayout, typeof MainLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MainLayout, new MainLayout({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
{
    const { sidebar: __VLS_thisSlot } = __VLS_2.slots;
    /** @type {[typeof MenuSidebarWidget, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(MenuSidebarWidget, new MenuSidebarWidget({}));
    const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
}
{
    const { content: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wrapper__services" },
    });
    for (const [service] of __VLS_getVForSourceType((__VLS_ctx.services))) {
        /** @type {[typeof CardComponent, ]} */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(CardComponent, new CardComponent({
            key: (service.title),
            isDocs: (true),
            tag: "docs",
            title: (service.title),
            href: (`/dashboard/${service.title}`),
        }));
        const __VLS_8 = __VLS_7({
            key: (service.title),
            isDocs: (true),
            tag: "docs",
            title: (service.title),
            href: (`/dashboard/${service.title}`),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['wrapper__services']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MainLayout: MainLayout,
            CardComponent: CardComponent,
            MenuSidebarWidget: MenuSidebarWidget,
            services: services,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
