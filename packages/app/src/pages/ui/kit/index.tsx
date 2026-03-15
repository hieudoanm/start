import { Code } from '@start/components/preview/Code';
import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { useState } from 'react';

type Component = {
  id: string;
  group: string;
  emoji: string;
  name: string;
  code: string;
};

const UIKitPage: NextPage<{ components: Component[] }> = ({
  components = [],
}) => {
  const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

  const filteredComponents = components.filter(({ id, name }) => {
    return (
      id.toLowerCase().includes(query.toLowerCase()) ||
      name.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <PageTemplate
      query={query}
      setState={setState}
      id="ui-kit"
      emoji="🎨"
      title="atomic/ui"
      description="is a free set of Tailwind CSS components built following atomic design principles for consistent UI development.">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col gap-y-4 md:gap-y-8">
            <h2 className="text-2xl font-bold">
              <span className="capitalize">Components</span> (
              {filteredComponents.length})
            </h2>
            {filteredComponents.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                  {filteredComponents.map(
                    ({ id = '', emoji = '', group, name = '' }) => {
                      return (
                        <Link href={`#${id}`} key={id}>
                          <div className="col-span-1">
                            <div className="flex items-center gap-x-2 rounded-lg border border-neutral-200 bg-white/40 p-4 shadow dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-neutral-100/10">
                              <p className="text-2xl">{emoji}</p>
                              <div className="flex flex-col gap-y-0.25">
                                <p className="text-xs capitalize">{group}</p>
                                <p className="text-sm font-semibold capitalize">
                                  {name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                  {filteredComponents.map(
                    ({
                      id = '',
                      emoji = '',
                      group = '',
                      name = '',
                      code = '',
                    }) => {
                      return (
                        <div key={id} className="flex flex-col gap-y-4">
                          <Code
                            id={id}
                            emoji={emoji}
                            group={group}
                            name={name}
                            code={code}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export const getStaticProps = () => {
  const components = [
    {
      path: 'button/standard/fill/small',
      emoji: '🔘',
      name: 'Button - Fill (Small)',
    },
    {
      path: 'button/standard/fill/medium',
      emoji: '🔘',
      name: 'Button - Fill (Medium)',
    },
    {
      path: 'button/standard/fill/large',
      emoji: '🔘',
      name: 'Button - Fill (Large)',
    },
    {
      path: 'button/standard/outline/small',
      emoji: '🔘',
      name: 'Button - Outline (Small)',
    },
    {
      path: 'button/standard/outline/medium',
      emoji: '🔘',
      name: 'Button - Outline (Medium)',
    },
    {
      path: 'button/standard/outline/large',
      emoji: '🔘',
      name: 'Button - Outline (Large)',
    },
    {
      path: 'button/round/fill/small',
      emoji: '🔘',
      name: 'Button - Round - Fill (Small)',
    },
    {
      path: 'button/round/fill/medium',
      emoji: '🔘',
      name: 'Button - Round - Fill (Medium)',
    },
    {
      path: 'button/round/fill/large',
      emoji: '🔘',
      name: 'Button - Round - Fill (Large)',
    },
    {
      path: 'button/round/outline/small',
      emoji: '🔘',
      name: 'Button - Round - Outline (Small)',
    },
    {
      path: 'button/round/outline/medium',
      emoji: '🔘',
      name: 'Button - Round - Outline (Medium)',
    },
    {
      path: 'button/round/outline/large',
      emoji: '🔘',
      name: 'Button - Round - Outline (Large)',
    },
    { path: 'button/icon/fill', emoji: '🖱️', name: 'Button - Icon - Fill' },
    {
      path: 'button/icon/outline',
      emoji: '🖱️',
      name: 'Button - Icon - Outline',
    },
    { path: 'button/button-dropdown', emoji: '🔽', name: 'Button Dropdown' },
    { path: 'button/button-group', emoji: '👆', name: 'Button Group' },
    { path: 'data/list', emoji: '📋', name: 'List' },
    { path: 'data/stats', emoji: '📊', name: 'Stats' },
    { path: 'data/table', emoji: '📈', name: 'Table' },
    { path: 'data/tooltip', emoji: '💬', name: 'Tooltip' },
    { path: 'feedback/alert', emoji: '🚨', name: 'Alert' },
    { path: 'feedback/badge/fill', emoji: '🏷️', name: 'Badge - Fill' },
    { path: 'feedback/badge/outline', emoji: '🏷️', name: 'Badge - Outline' },
    { path: 'feedback/loading', emoji: '⏳', name: 'Loading' },
    { path: 'feedback/progress', emoji: '🏁', name: 'Progress' },
    { path: 'feedback/skeleton', emoji: '🩻', name: 'Skeleton' },
    { path: 'feedback/toast/fill', emoji: '🥑', name: 'Toast - Fill' },
    { path: 'feedback/toast/outline', emoji: '🥑', name: 'Toast - Outline' },
    { path: 'form/calendar', emoji: '📅', name: 'Calendar' },
    { path: 'form/color', emoji: '🎨', name: 'Color' },
    { path: 'form/checkbox', emoji: '☑️', name: 'Checkbox' },
    { path: 'form/input', emoji: '⌨️', name: 'Input' },
    { path: 'form/radio', emoji: '🔘', name: 'Radio' },
    { path: 'form/range', emoji: '🎚️', name: 'Range' },
    { path: 'form/select', emoji: '📑', name: 'Select' },
    { path: 'form/textarea', emoji: '📝', name: 'Textarea' },
    { path: 'form/toggle/linear', emoji: '🔄', name: 'Toggle (Linear)' },
    { path: 'form/toggle/solid', emoji: '🔄', name: 'Toggle (Solid)' },
    { path: 'layout/accordian', emoji: '📑', name: 'Accordian' },
    { path: 'layout/card', emoji: '💳', name: 'Card' },
    { path: 'layout/collapse', emoji: '📂', name: 'Collapse' },
    { path: 'layout/divider', emoji: '➖', name: 'Divider' },
    { path: 'layout/drawer', emoji: '🗄️', name: 'Drawer' },
    { path: 'layout/modal', emoji: '📦', name: 'Modal' },
    { path: 'media/avatar', emoji: '🖼️', name: 'Avatar' },
    { path: 'media/carousel', emoji: '🎠', name: 'Carousel' },
    { path: 'media/diff', emoji: '🧬', name: 'Diff' },
    { path: 'media/file', emoji: '📂', name: 'File' },
    { path: 'typography/code', emoji: '🧑‍💻', name: 'Code' },
    { path: 'typography/kbd', emoji: '⌨️', name: 'KBD' },
    { path: 'typography/heading', emoji: '🔠', name: 'Heading' },
    { path: 'typography/paragraph', emoji: '🔤', name: 'Paragraph' },
  ].map(({ path = '', emoji = '', name = '' }) => {
    const DEV_PATH = '../../../..';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(dirname(__filename), DEV_PATH);

    const group = path.split('/').at(0);
    const id = path.replaceAll('/', '-');
    const componentPath = `${__dirname}/src/html/kit/${path}.html`;
    const code = readFileSync(componentPath, 'utf-8');
    return { id, group, name, emoji, code };
  });

  return { props: { components } };
};

export default UIKitPage;
