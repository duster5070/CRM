"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type TiptapProps = {
  value?: string;
  onChange: (content: string) => void;
};

import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  RemoveFormatting,
  LucideIcon,
} from "lucide-react";
import { type Editor } from "@tiptap/react";

type MenuButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  icon: LucideIcon;
};

const MenuButton = ({ onClick, isActive, disabled, title, icon: Icon }: MenuButtonProps) => (
  <button
    onClick={onClick}
    onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
    disabled={disabled}
    className={`rounded-md p-2 ${
      isActive
        ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    } disabled:opacity-50`}
    type="button"
    title={title}
  >
    <Icon className="h-4 w-4" />
  </button>
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="mb-2 flex flex-wrap gap-2 border-b pb-2">
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
        icon={Bold}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
        icon={Italic}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strike"
        icon={Strikethrough}
      />
      <div className="mx-1 w-px self-stretch bg-slate-200 dark:bg-slate-700" />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
        icon={Heading1}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
        icon={Heading2}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
        icon={Heading3}
      />
      <div className="mx-1 w-px self-stretch bg-slate-200 dark:bg-slate-700" />
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
        icon={List}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Ordered List"
        icon={ListOrdered}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Blockquote"
        icon={Quote}
      />
      <div className="mx-1 w-px self-stretch bg-slate-200 dark:bg-slate-700" />
      <MenuButton
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        title="Clear Formatting"
        icon={RemoveFormatting}
      />
      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title="Undo"
        icon={Undo}
      />
      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title="Redo"
        icon={Redo}
      />
    </div>
  );
};

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[150px] p-2 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-slate-500 prose-blockquote:pl-4 prose-blockquote:italic",
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML()); // 🔥 GET CONTENT HERE
    },
  });

  // 🔄 Load existing content (edit mode)
  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      // Only set content if it's different to prevent cursor jumps or unnecessary re-renders
      // But for initial load it's fine.
      // Better: if (editor.isEmpty && value)
      if (editor.getHTML() === "<p></p>" && value) {
        editor.commands.setContent(value);
      }
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-950">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
