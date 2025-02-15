import React, {useCallback, useState} from 'react';
import ReactJson, {InteractionProps} from 'react-json-view';
import './style.scss';
import {SendTransactionRequest, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import { TxForm2 } from '../TxForm2/TxForm2';
import { TxForm3 } from '../TxForm3/TxForm3';
import { TxForm4 } from '../TxForm4/TxForm4';
import { TxForm5 } from '../TxForm5/TxForm5';


// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.
const defaultTx: SendTransactionRequest = {
  // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [

    {
      // The receiver's address.
      address: 'UQDQ5glJxfkNcp4qZdo7XcXLRPEKjgnANcPE6Zt8-kL-8Vm0',
      // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
      amount: '300000000',
      // (optional) State initialization in boc base64 format.
      stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
      // (optional) Payload in boc base64 format.
      payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
    },

    // Uncomment the following message to send two messages in one transaction.
    /*
    {
      // Note: Funds sent to this address will not be returned back to the sender.
      address: 'UQAuz15H1ZHrZ_psVrAra7HealMIVeFq0wguqlmFno1f3B-m',
      amount: toNano('0.01').toString(),
    }
    */
  ],
};

export function TxForm() {

  const [tx, setTx] = useState(defaultTx);

  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  const onChange = useCallback((value: InteractionProps) => {
    setTx(value.updated_src as SendTransactionRequest)
  }, []);

  return (
    <div className="send-tx-form">
      <img className="main-banner" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/Star.webp" alt="Star" height="100px" />
      <h3>✨Fast, easy, secure and without authenticationh!✨</h3>

      <div className="form-signin">       
        <input type="text" name="username" className="form-control" placeholder="Enter Telegram username..." required="" autofocus="" />
      </div>

      {/*  <ReactJson theme="ocean" src={defaultTx} onEdit={onChange} onAdd={onChange} onDelete={onChange}/> */}
      

            {wallet ? (
        <button onClick={() => tonConnectUi.sendTransaction(tx)}>
          <img className="image-left" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/StarPrice.gif" alt="star" /><p className="price-left">50</p><p className="price-right">0.3</p><img className="image-right" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/Ton.svg" alt="ton" />
          </button>
      ) : (
        <button onClick={() => tonConnectUi.openModal()}>
          <img className="image-left" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/StarPrice.gif" alt="star" /><p className="price-left">50</p><p className="price-right">0.3</p><img className="image-right" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/Ton.svg" alt="ton" />
          </button>
      )}
      
        <TxForm2 />
        <TxForm3 />
        <TxForm4 />
        <TxForm5 />


    </div>
  );
}