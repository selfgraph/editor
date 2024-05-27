<template>
  <div class="w-full h-full">
    <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 100, animation: 'scale-subtle' }"
        v-if="editor && !oneLine"
    >
      <Card>
        <CardContent class="overflow-hidden overflow-x-auto scrollbar-hide">
          <div class="flex w-fit">
            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleBold().run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('bold') }">
              <Bold/>
            </Button>
            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleItalic().run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('italic') }">
              <Italic/>
            </Button>
            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleStrike().run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('strike') }">
              <Strikethrough/>
            </Button>

            <Dialog>
              <DialogTrigger as-child>
                <Button variant="ghost" class="m-1 px-2" @click="linkUrl = (editor.isActive('link') ? editor.getAttributes('link').href : '')"
                        :class="{ 'bg-primary text-primary-foreground': editor.isActive('link') }">
                  <Link/>
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Link</DialogTitle>
                  <DialogDescription>
                    Insert link in your post. Only HTTP links are supported.
                  </DialogDescription>
                </DialogHeader>
                <div class="flex items-center space-x-2">
                  <div class="grid flex-1 gap-2">
                    <Input
                        placeholder="https://example.com"
                        v-model="linkUrl"
                    />
                  </div>
                </div>
                <DialogFooter class="flex w-full flex-row" style="justify-content: space-between !important;">
                  <DialogClose as-child>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <div>
                    <DialogClose as-child v-if="editor.isActive('link')">
                      <Button type="button" variant="destructive" class="mr-2"
                              @click="editor.chain().focus().unsetLink().run(); linkUrl = '';">
                        Remove
                      </Button>
                    </DialogClose>
                    <DialogClose as-child>
                      <Button type="button" variant="default"
                              @click="editor.chain().focus().setLink({href: linkUrl}).run(); linkUrl = '';">
                        {{ editor.isActive('link') ? 'Edit' : 'Add' }}
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleHeading({level: 2}).run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', {level: 2}) }">
              <Heading2/>
            </Button>
            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleHeading({level: 3}).run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', {level: 3}) }">
              <Heading3/>
            </Button>
            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('blockquote')}">
              <Quote/>
            </Button>
            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleCode().run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('code')}">
              <Code/>
            </Button>
            <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'bg-primary text-primary-foreground': editor.isActive('codeBlock')}">
              <SquareCode/>
            </Button>
          </div>
        </CardContent>
      </Card>
    </bubble-menu>

    <floating-menu :editor="editor" :tippy-options="{ duration: 100, animation: 'scale-subtle' }"
                   v-if="editor && !oneLine">
      <Card>
        <CardContent>

          <Dialog v-if="uploadFile">
            <DialogTrigger as-child>
              <Button variant="ghost" class="m-1 px-2">
                <ImageUp/>
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Image</DialogTitle>
                <DialogDescription>
                  Upload image. Max size: 10 megabytes.
                </DialogDescription>
              </DialogHeader>
              <div class="flex items-center space-x-2">
                <div class="grid flex-1 gap-2">
                  <Input
                      type="file"
                      @change="(e) => uploadFileCallback(e)"
                  />
                </div>
              </div>
              <DialogFooter class="flex w-full flex-row" style="justify-content: space-between !important;">
                <DialogClose as-child>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <div>
                  <DialogClose as-child>
                    <Button type="button" variant="default"
                            @click="fileUrl ? editor.chain().focus().setImage({src: fileUrl}).run() : null; fileUrl = '';">
                      Upload
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleHeading({level: 2}).run()"
                  :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', {level: 2}) }">
            <Heading2/>
          </Button>
          <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleHeading({level: 3}).run()"
                  :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', {level: 3}) }">
            <Heading3/>
          </Button>
          <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleBlockquote().run()"
                  :class="{ 'bg-primary text-primary-foreground': editor.isActive('blockquote')}">
            <Quote/>
          </Button>
          <Button variant="ghost" class="m-1 px-2" @click="editor.chain().focus().toggleCodeBlock().run()"
                  :class="{ 'bg-primary text-primary-foreground': editor.isActive('codeBlock')}">
            <SquareCode/>
          </Button>
        </CardContent>
      </Card>
    </floating-menu>

    <editor-content :editor="editor"/>
  </div>
</template>

<script setup>
import {EditorContent, Editor, BubbleMenu, Extension, FloatingMenu} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import {onBeforeUnmount, onMounted, ref, toRefs, watch} from "vue";
import {Card, CardContent} from "@/components/ui/card/index.ts";
import {Button} from "@/components/ui/button/index.ts";
import {Bold, Italic, Strikethrough, Heading2, Heading3, Quote, Code, Link, SquareCode, ImageUp} from 'lucide-vue-next';
import {all, createLowlight} from 'lowlight';
import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";
import {Placeholder} from "@tiptap/extension-placeholder";
import Document from '@tiptap/extension-document';
import {Link as LinkExtension} from "@tiptap/extension-link";
import {Input} from '@/components/ui/input/index.ts';
import {Code as CodeInline} from '@tiptap/extension-code';
import {Image} from '@tiptap/extension-image';

import 'tippy.js/animations/scale-subtle.css';
import 'highlight.js/styles/atom-one-dark.css';
import '@/styles/global.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog/index.ts';

defineModel('html');
defineModel('json');
defineModel('text');

const emits = defineEmits(['update:html', 'update:json', 'update:text']);

const editor = ref();

const linkUrl = ref('');
const fileUrl = ref('');

const uploadFileCallback = async (e) => {
  const file = e.target.files[0] ?? null;
  if (!file) {
    fileUrl.value = '';
    return;
  }

  if (!uploadFile.value) {
    fileUrl.value = '';
    return;
  }

  const res = uploadFile.value(file);
  if (res instanceof Promise) {
    fileUrl.value = await res;
    return;
  }

  fileUrl.value = res;
};

const props = defineProps({
  initialContent: String,
  placeholder: String,
  oneLine: Boolean,
  oneLineContent: String,
  readonly: Boolean,
  uploadFile: Function,
});

const {initialContent, placeholder, oneLine, oneLineContent, readonly, uploadFile} = toRefs(props);

watch(() => readonly.value, (newValue) => {
  editor.value.setEditable(!newValue);
});

onMounted(() => {
  const lowlight = createLowlight(all);

  const extensions = [
    Image,
    StarterKit,
    CodeInline.configure({
      HTMLAttributes: {
        class: 'inline',
      },
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Placeholder.configure({
      placeholder: placeholder.value,
    }),
    LinkExtension.configure({
      openOnClick: false, // with other values tiptap has bug, and open links dually
      linkOnPaste: true,
      autolink: true,
      HTMLAttributes: {
        // Allow search engines to follow links(remove nofollow)
        rel: 'noopener noreferrer',
        target: '_blank',
        class: 'link-tooltip',
      },
      validate: href => /^https?:\/\//.test(href),
    }),
  ];

  if (oneLine.value) {
    extensions.push(Document.extend({
      content: oneLineContent.value ?? 'block',
    }));
    extensions.push(Extension.create({
      addKeyboardShortcuts() {
        return {
          'Shift-Enter': () => true,
        };
      }
    }));
  }

  editor.value = new Editor({
    extensions: extensions,
    content: initialContent.value,
    editable: !readonly.value,
    onUpdate: () => {
      emits('update:html', editor.value.getHTML());
      emits('update:json', editor.value.getJSON());
      emits('update:text', editor.value.getText());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert lg:prose-lg focus:outline-none prose-img:rounded-xl',
      }
    }
  });

  emits('update:html', editor.value.getHTML());
  emits('update:json', editor.value.getJSON());
  emits('update:text', editor.value.getText());
});

onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>