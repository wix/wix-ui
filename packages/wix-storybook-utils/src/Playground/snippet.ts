import { formatCode } from '../LiveCodeExample/format-code';

const snippetDatastoreUrl = `https://www.wix.com/_serverless/wix-style-react-playground/snippet`;

export const loadSnippet = async (snippetId: string) => {
  try {
    const response = await fetch(`${snippetDatastoreUrl}/${snippetId}`);
    const { isSafe, code } = await response.json();

    if (code && code.trim().length) {
      return {
        code: formatCode(code),
        isSafe,
      };
    }

    return Promise.reject(`Invalid code snippet loaded: ${code}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveSnippet = async (code: string): Promise<string> => {
  try {
    const response = await fetch(snippetDatastoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: code }),
    });

    if (response.status === 200) {
      const { id } = await response.json();
      return id;
    }

    return Promise.reject(response.statusText);
  } catch (error) {
    return Promise.reject(error);
  }
};
