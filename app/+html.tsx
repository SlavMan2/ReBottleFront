import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="theme-color"
          content="#ffffff"
        />

        <link
          rel="manifest"
          href="/manifest.json"
        />

        <link
          rel="icon"
          href="/assets/pwa/icon-192.png"
        />

        <ScrollViewStyleReset />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker
                    .register('/sw.js')
                    .then(registration => {
                      console.log(
                        'Service Worker registered:',
                        registration.scope
                      );
                    })
                    .catch(error => {
                      console.error(
                        'Service Worker registration failed:',
                        error
                      );
                    });
                });
              }
            `,
          }}
        />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}