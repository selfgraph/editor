import { type PopoverContentProps } from 'radix-vue';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<PopoverContentProps & {
    class?: any;
}>, {
    align: string;
    sideOffset: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    escapeKeyDown: (event: KeyboardEvent) => void;
    pointerDownOutside: (event: import("node_modules/radix-vue/dist/DismissableLayer").PointerDownOutsideEvent) => void;
    focusOutside: (event: import("node_modules/radix-vue/dist/DismissableLayer").FocusOutsideEvent) => void;
    interactOutside: (event: import("node_modules/radix-vue/dist/DismissableLayer").PointerDownOutsideEvent | import("node_modules/radix-vue/dist/DismissableLayer").FocusOutsideEvent) => void;
    openAutoFocus: (event: Event) => void;
    closeAutoFocus: (event: Event) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<PopoverContentProps & {
    class?: any;
}>, {
    align: string;
    sideOffset: number;
}>>> & {
    onEscapeKeyDown?: (event: KeyboardEvent) => any;
    onPointerDownOutside?: (event: import("node_modules/radix-vue/dist/DismissableLayer").PointerDownOutsideEvent) => any;
    onFocusOutside?: (event: import("node_modules/radix-vue/dist/DismissableLayer").FocusOutsideEvent) => any;
    onInteractOutside?: (event: import("node_modules/radix-vue/dist/DismissableLayer").PointerDownOutsideEvent | import("node_modules/radix-vue/dist/DismissableLayer").FocusOutsideEvent) => any;
    onOpenAutoFocus?: (event: Event) => any;
    onCloseAutoFocus?: (event: Event) => any;
}, {
    sideOffset: number;
    align: "end" | "start" | "center";
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
