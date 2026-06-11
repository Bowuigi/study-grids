import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Code, Html, Root } from 'mdast';
import { default as loadPikchr } from 'pikchr-js';

const pikchr = await loadPikchr();

/**
 * Remark plugin that renders Pikchr code blocks as inline SVG.
 * Use it in Astro by adding to `markdown.remarkPlugins` or `mdx.remarkPlugins`.
 */
export const remarkPikchr: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: any) => {
      if (node.lang !== 'pikchr') return;

      try {
        // Render SVG using pikchr-js
        const svgString = pikchr(node.value);

        // Replace code node with raw HTML node containing SVG
        const htmlNode: Html = {
          type: 'html',
          value: `<div class="pikchr-diagram">${svgString}</div>`,
        };
        parent.children.splice(index, 1, htmlNode);
      } catch (error) {
        console.error(`[remark-pikchr] Failed to render diagram:\n${node.value}\n`, error);
        // Optionally keep the original code block or show error message
        const errorNode: Html = {
          type: 'html',
          value: `<pre class="pikchr-error">Error rendering Pikchr: ${(error as Error).message}\n\n${node.value}</pre>`,
        };
        parent.children.splice(index, 1, errorNode);
      }
    });
  };
};

export default remarkPikchr;
