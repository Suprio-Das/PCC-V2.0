import { useEffect } from 'react';

function DocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - PCIU Computer Club`;
  }, [title]);
}

function ErrorTitle(title: string) {
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);
}

export { ErrorTitle };

export default DocumentTitle;
