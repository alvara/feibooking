import React from 'react';

type PayloadContent = { [k: string]: unknown }[] | undefined;

interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface ContentNode {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'ul' | 'ol';
  children: TextNode[];
}

interface RichTextProps {
  content: PayloadContent;
  className?: string;
}

function isTextNode(node: unknown): node is TextNode {
  return typeof node === 'object' && node !== null && 'text' in node;
}

function isContentNode(node: unknown): node is ContentNode {
  return typeof node === 'object' && node !== null && 'type' in node && 'children' in node;
}

function RichText({ content, className = '' }: RichTextProps): React.ReactElement {
  const renderTextNode = (node: unknown, index: number): React.ReactNode => {
    if (!isTextNode(node)) return null;

    let result: React.ReactNode = node.text;
    if (node.bold) {
      result = <strong key={index}>{result}</strong>;
    }
    if (node.italic) {
      result = <em key={index}>{result}</em>;
    }
    if (node.underline) {
      result = <u key={index}>{result}</u>;
    }
    return result;
  };

  const renderContentNode = (node: unknown, index: number): React.ReactNode => {
    if (!isContentNode(node)) return null;

    const children = node.children.map(renderTextNode);

    switch (node.type) {
      case 'h1':
        return (
          <h1 key={index} className="text-4xl md:text-7xl font-bold mb-4">
            {children}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={index} className="text-3xl font-bold mb-3">
            {children}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={index} className="text-2xl font-bold mb-2">
            {children}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={index} className="text-xl font-bold mb-2">
            {children}
          </h4>
        );
      case 'h5':
        return (
          <h5 key={index} className="text-lg font-bold mb-2">
            {children}
          </h5>
        );
      case 'h6':
        return (
          <h6 key={index} className="text-base font-bold mb-2">
            {children}
          </h6>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-4">
            {children}
          </p>
        );
      case 'ul':
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {children.map((child, i) => (
              <li key={i}>{child}</li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            {children.map((child, i) => (
              <li key={i}>{child}</li>
            ))}
          </ol>
        );
    }
  };

  return <div className={`${className}`}>{content?.map(renderContentNode)}</div>;
}

export { RichText };
