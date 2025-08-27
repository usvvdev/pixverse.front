import { ref } from 'vue';
const __VLS_props = defineProps();
const emit = defineEmits();
const inputRef = ref(null);
// пробрасываем наружу, если где-то нужен прямой доступ к <input>
const __VLS_exposed = { inputRef };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form__group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: (__VLS_ctx.id),
});
(__VLS_ctx.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.emit('update:modelValue', $event.target.value);
        } },
    ref: "inputRef",
    ...{ class: "form__group-input" },
    type: (__VLS_ctx.type),
    id: (__VLS_ctx.id),
    value: (__VLS_ctx.modelValue),
    required: true,
});
/** @type {typeof __VLS_ctx.inputRef} */ ;
/** @type {__VLS_StyleScopedClasses['form__group']} */ ;
/** @type {__VLS_StyleScopedClasses['form__group-input']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            emit: emit,
            inputRef: inputRef,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
