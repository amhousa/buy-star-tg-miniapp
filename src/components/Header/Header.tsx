import {TonConnectButton} from "@tonconnect/ui-react";
import './header.scss';

export const Header = () => {
    return <header>
        <div class="CEFe1FhH custom-emoji emoji" data-entity-type="MessageEntityCustomEmoji" data-document-id="5472163775375235329" data-alt="⭐️"><img class="a8dMNkh3" src="https://web.telegram.org/a/blank.8dd283bceccca95a48d8.png" alt="⭐️" data-entity-type="MessageEntityCustomEmoji" data-document-id="5472163775375235329" draggable="false"><img src="blob:https://web.telegram.org/791b92b2-2257-4ff7-a983-1d63c5f81b27" class="opacity-transition slow gYSfUe37 AvU_FtMd vbcXDDxa O_TaDxWg sticker-media not-shown not-open" alt="" draggable="false"></div>
        <span>Buy Star</span>
        <TonConnectButton />
    </header>
}
