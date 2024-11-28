import './patch-local-storage-for-github-pages';
import './polyfills';
import eruda from "eruda";

import React, {StrictMode} from 'react'
import {render} from 'react-dom';
import App from './App'
import './index.scss'
import {runSingleInstance} from "./utils/run-signle-instance";

// eruda.init();

async function enableMocking() {
  const host = document.baseURI.replace(/\/$/, '');

  return new Promise(async (resolve) => {
    const {worker} = await import('./server/worker');

    const startMockWorker = () => worker.start({
      onUnhandledRequest: 'bypass',
      quiet: false,
      serviceWorker: {
        url: `${import.meta.env.VITE_GH_PAGES ? '/demo-dapp-with-react-ui' : ''}/mockServiceWorker.js`
      }
    });
    let serviceWorkerRegistration: ServiceWorkerRegistration | null | void = await startMockWorker();
    resolve(serviceWorkerRegistration);

    const verifyAndRestartWorker = runSingleInstance(async () => {
      try {
        const serviceWorkerRegistrations = await navigator.serviceWorker?.getRegistrations() || [];

        const isServiceWorkerOk = serviceWorkerRegistrations.length > 0;
        const isApiOk = await fetch(`${host}/api/healthz`)
          .then(r => r.status === 200 ? r.json().then(p => p.ok).catch(() => false) : false)
          .catch(() => false);

        if (!isServiceWorkerOk || !isApiOk) {
          await serviceWorkerRegistration?.unregister().catch(() => {});
          serviceWorkerRegistration = await startMockWorker().catch(() => null);
        }
      } catch (error) {
        console.error('Error in verifyAndRestartWorker:', error);
        serviceWorkerRegistration = await startMockWorker().catch(() => null);
      }
    });

    setInterval(verifyAndRestartWorker, 1_000);
  });
}
// main.js or your entry file

// Retrieve the user object
const user = Telegram.WebApp.getUser();

// Access username
const username = user.username;

// Access profile photo file_id (choose appropriate size)
const profilePhoto = user.photo && user.photo.length > 0 ? user.photo[0].file_id : null;

// Function to get the profile picture URL
async function getProfilePictureUrl(fileId) {
  const botToken = '<YOUR_BOT_TOKEN>'; // Replace with your bot's token
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
  const data = await response.json();
  if (data.ok && data.result) {
    const filePath = data.result.file_path;
    return `https://api.telegram.org/file/bot${botToken}/${filePath}`;
  } else {
    console.error('Failed to get file path:', data);
    return null;
  }
}

// Display username
document.getElementById('username').innerText = `Username: ${username}`;

// Display profile picture
if (profilePhoto) {
  getProfilePictureUrl(profilePhoto).then(url => {
    if (url) {
      document.getElementById('profile-picture').src = url;
    } else {
      // Use a default image if unable to fetch
      document.getElementById('profile-picture').src = 'path_to_default_image.jpg';
    }
  });
} else {
  // No profile picture, use default image
  document.getElementById('profile-picture').src = 'path_to_default_image.jpg';
}

enableMocking().then(() => render(

    <App/>,
  document.getElementById('root') as HTMLElement
));
