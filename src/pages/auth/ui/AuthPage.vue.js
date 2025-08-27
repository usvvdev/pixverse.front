import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/app/layouts/main/ui/MainLayout.vue';
import FormComponent from '@/components/form/ui/FormComponent.vue';
import ButtonComponent from '@/components/button/ui/ButtonComponent.vue';
import LinkIcon from '@/app/assets/icons/LinkIcon.vue';
import useAuthStore from '@/app/providers/stores';
const controller = useAuthStore();
const router = useRouter();
const formData = reactive({
    username: '',
    password: '',
});
const authUser = async () => {
    try {
        const response = await controller.auth({ ...formData });
        if (response?.access_token) {
            await router.push('/services');
        }
    }
    catch (err) {
        console.error('Authorization error: ', err);
    }
};
const authFormItems = [
    { name: 'username', type: 'text', id: 'uname', key: 'username' },
    { name: 'password', type: 'password', id: 'upass', key: 'password' },
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof MainLayout, typeof MainLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MainLayout, new MainLayout({
    mainClass: "auth__layout",
}));
const __VLS_1 = __VLS_0({
    mainClass: "auth__layout",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
{
    const { content: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.authUser) },
        ...{ class: "auth__card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "auth__card-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "auth__card-header__title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "auth__card-header__subtitle" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.authFormItems))) {
        /** @type {[typeof FormComponent, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(FormComponent, new FormComponent({
            key: (item.key),
            name: (item.name),
            type: (item.type),
            id: (item.id),
            modelValue: (__VLS_ctx.formData[item.key]),
        }));
        const __VLS_5 = __VLS_4({
            key: (item.key),
            name: (item.name),
            type: (item.type),
            id: (item.id),
            modelValue: (__VLS_ctx.formData[item.key]),
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    }
    /** @type {[typeof ButtonComponent, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(ButtonComponent, new ButtonComponent({
        icon: (__VLS_ctx.LinkIcon),
        type: "submit",
    }));
    const __VLS_8 = __VLS_7({
        icon: (__VLS_ctx.LinkIcon),
        type: "submit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['auth__card']} */ ;
/** @type {__VLS_StyleScopedClasses['auth__card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['auth__card-header__title']} */ ;
/** @type {__VLS_StyleScopedClasses['auth__card-header__subtitle']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MainLayout: MainLayout,
            FormComponent: FormComponent,
            ButtonComponent: ButtonComponent,
            LinkIcon: LinkIcon,
            formData: formData,
            authUser: authUser,
            authFormItems: authFormItems,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
