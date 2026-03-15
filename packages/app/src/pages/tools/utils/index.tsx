import { Code } from '@start/components/preview/Code';
import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { useState } from 'react';

type Util = {
  id: string;
  name: string;
  group: string;
  emoji: string;
  code: string;
};

const UtilsPage: NextPage<{ utils: Util[] }> = ({ utils = [] }) => {
  const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

  const filteredUtils = utils.filter(({ id, name }) => {
    return (
      id.toLowerCase().includes(query.toLowerCase()) ||
      name.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <PageTemplate
      query={query}
      setState={setState}
      id="tools-utils"
      emoji="🧰"
      title="atomic/utils"
      description="is a free set of reusable utility functions designed to simplify common tasks and improve code efficiency and maintainability.">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col gap-y-4 md:gap-y-8">
            <h2 className="text-2xl font-bold">
              <span className="capitalize">Utils</span> ({filteredUtils.length})
            </h2>
            {filteredUtils.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                  {filteredUtils.map(
                    ({ id = '', emoji = '', group, name = '' }) => {
                      return (
                        <Link href={`#${id}`} key={id}>
                          <div className="col-span-1">
                            <div className="flex items-center gap-x-2 rounded-lg border border-neutral-200 bg-white/40 p-4 shadow dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-neutral-100/10">
                              <p className="text-2xl">{emoji}</p>
                              <div className="flex flex-col gap-y-0.25">
                                <p className="text-xs capitalize">{group}</p>
                                <p className="font-semibold capitalize">
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
                <div className="flex flex-col gap-y-8">
                  {filteredUtils.map(
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
                            codeOnly
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
  const utils: {
    id: string;
    group: string;
    emoji: string;
    name: string;
    code: string;
  }[] = [
    { path: 'array/chunk', emoji: '📦', name: 'Chunk' },
    { path: 'array/compact', emoji: '🧹', name: 'Compact' },
    { path: 'array/difference', emoji: '➖', name: 'Difference' },
    { path: 'array/group-by', emoji: '🗂️', name: 'Group By' },
    { path: 'array/intersection', emoji: '🔗', name: 'Intersection' },
    { path: 'array/shuffle', emoji: '🔀', name: 'Shuffle' },
    { path: 'array/union', emoji: '⚡', name: 'Union' },
    { path: 'array/unique', emoji: '🔑', name: 'Unique' },
    { path: 'clipboard/copy', emoji: '📋', name: 'Copy' },
    { path: 'clipboard/paste', emoji: '📥', name: 'Paste' },
    { path: 'date/format', emoji: '📅', name: 'Date Format' },
    { path: 'date/diff', emoji: '⏳', name: 'Date Diff' },
    { path: 'functional/memoize', emoji: '🧠', name: 'Memoize' },
    { path: 'functional/once', emoji: '☝️', name: 'Once' },
    { path: 'functional/request', emoji: '📡', name: 'Request' },
    { path: 'functional/try-catch', emoji: '🛡️', name: 'Try/Catch' },
    { path: 'number/clamp', emoji: '🧮', name: 'Clamp' },
    { path: 'number/commas', emoji: '🔢', name: 'Commas' },
    { path: 'number/currency', emoji: '💰', name: 'Currency' },
    { path: 'number/random', emoji: '🎲', name: 'Random' },
    { path: 'performance/debounce', emoji: '🕒', name: 'Debounce' },
    { path: 'performance/rate-limit', emoji: '⏳', name: 'Rate Limit' },
    { path: 'performance/sleep', emoji: '😴', name: 'Sleep' },
    { path: 'performance/throttle', emoji: '🚦', name: 'Throttle' },
    { path: 'storage/cookies', emoji: '🍪', name: 'Cookies' },
    { path: 'storage/indexed.db', emoji: '💾', name: 'Indexed DB' },
    { path: 'storage/local-storage', emoji: '🗄️', name: 'Local Storage' },
    { path: 'storage/session-storage', emoji: '📦', name: 'Session Storage' },
  ].map(({ path = '', emoji = '', name = '' }) => {
    const DEV_PATH = '../../../..';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(dirname(__filename), DEV_PATH);

    const group = path.split('/').at(0) ?? 'utils';
    const id = path.replaceAll('/', '-');
    const utilPath = `${__dirname}/src/utils/${path}.ts`;
    const code = readFileSync(utilPath, 'utf-8');
    return { id, group, name, emoji, code };
  });

  return { props: { utils } };
};

export default UtilsPage;
