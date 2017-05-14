import React from 'react';

import { postSendRequest } from './apiClient';
import { publicKey } from './config';

const mybtoa = (str) =>
  btoa(String.fromCharCode.apply(null, new Uint8Array(str))).replace(/\+/g, '-').replace(/\//g, '_');

class ServiceWorker extends React.Component {
  constructor() {
    super();
    this.state = {
      payload: '',
      endpoint: '',
      publicKey: '',
      userAuth: '',
      ttl: 24 * 60 * 60
    };

    this.onPayloadChange = this.onPayloadChange.bind(this);
    this.onEndpointChange = this.onEndpointChange.bind(this);
    this.onPublicKeyChange = this.onPublicKeyChange.bind(this);
    this.onUserAuthChange = this.onUserAuthChange.bind(this);
    this.onTTLChange = this.onTTLChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
  }

  setSubscription(subscription) {
    this.setState({
      endpoint: subscription.endpoint,
      userAuth: mybtoa(subscription.getKey('auth')),
      publicKey: mybtoa(subscription.getKey('p256dh'))
    });
  }

  onPayloadChange(e) {
    this.setState({
      payload: e.target.value
    });
  }

  onEndpointChange(e) {
    this.setState({
      endpoint: e.target.value
    });
  }

  onPublicKeyChange(e) {
    this.setState({
      publicKey: e.target.value
    });
  }

  onUserAuthChange(e) {
    this.setState({
      userAuth: e.target.value
    });
  }

  onTTLChange(e) {
    this.setState({
      ttl: parseInt(e.target.value, 10)
    });
  }

  onRegister(e) {
    e.preventDefault();
    navigator.serviceWorker.register('/sw.js');
  }

  onSubmit(e) {
    e.preventDefault();
    postSendRequest(this.state);
  }

  onSubscribe(e) {
    e.preventDefault();
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
      }).then((subscription) => {
        this.setSubscription(subscription)
      });
    });
  }

  render() {
    const inputStyle = {
      width: '400px'
    };

    return (
      <section>
        <h1>Service Worker</h1>
        <section>
          <h2>Register Service Worker</h2>
          <p>
            <button onClick={this.onRegister}>Register</button>
            <br />
            <button onClick={this.onSubscribe}>Subscribe</button>
          </p>
        </section>
        <section>
          <h2>Send WebPush</h2>
          <div>
            <form onSubmit={this.onSubmit}>
              <p>
                <label htmlFor="payload">Payload</label>
                <input 
                  id="payload"
                  type="text"
                  value={this.state.payload}
                  style={inputStyle}
                  onChange={this.onPayloadChange}
                />
              </p>
              <p>
                <label htmlFor="endpoint">Endpoint</label>
                <input
                  id="endpoint"
                  type="text"
                  style={inputStyle}
                  value={this.state.endpoint}
                  onChange={this.onEndpointChange}
                />
              </p>
              <p>
                <label htmlFor="user-public-key">User Public Key</label>
                <input
                  id="user-public-key"
                  type="text"
                  style={inputStyle}
                  value={this.state.publicKey}
                  onChange={this.onPublicKeyChange}
                />
              </p>
              <p>
                <label htmlFor="user-auth">User Auth</label>
                <input
                  id="user-auch"
                  type="text"
                  style={inputStyle}
                  value={this.state.userAuth}
                  onChange={this.onUserAuthChange}
                />
              </p>
              <p>
                <label htmlFor="ttl">TTL</label>
                <input
                  id="ttl"
                  type="text"
                  style={inputStyle}
                  value={this.state.ttl}
                  onChange={this.onTTLChange}
                />
              </p>
              <button type="submit">submit</button>
            </form>
          </div>
        </section>
      </section>
    )
  }
}

export default ServiceWorker;
