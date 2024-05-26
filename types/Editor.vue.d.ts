declare const _default: import("vue").DefineComponent<{}, {
    $emit: (event: "update:html" | "update:json" | "update:text", ...args: any[]) => void;
    oneLine: boolean;
    readonly: boolean;
    initialContent?: string;
    placeholder?: string;
    oneLineContent?: string;
    uploadFile?: Function;
    $props: {
        readonly oneLine?: boolean;
        readonly readonly?: boolean;
        readonly initialContent?: string;
        readonly placeholder?: string;
        readonly oneLineContent?: string;
        readonly uploadFile?: Function;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
