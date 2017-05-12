import React from 'react';

class ServiceWorker extends React.Component {
  constructor() {
    super();
    this.state = {
      payload: '',
      endpoint: '',
      userPublicKey: '',
      userAuth: '',
      ttl: ''
    };
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

  onUserPublicKeyChange(e) {
    this.setState({
      userPublicKey: e.target.value
    });
  }

  onUserAuthChange(e) {
    this.setState({
      userAuth: e.target.value
    });
  }

  onTTLChange(e) {
    this.setState({
      ttl: e.target.value
    });
  }

  onRegister(e) {
    e.preventDefault();
    console.log('register');
  }

  render() {
    return (
      <section>
        <h1>Service Worker</h1>
        <section>
          <h2>Register Service Worker</h2>
          <p>
            <a
              onClick={this.onRegister}
              href="#"
            >
              Register
            </a>
          </p>
        </section>
        <section>
          <h2>Send WebPush</h2>
          <div>
            <form>
              <p>
                <label htmlFor="payload">Payload</label>
                <input id="payload" type="text" value={this.state.payload} onChange={this.onPayloadChange} />
              </p>
              <p>
                <label htmlFor="endpoint">Endpoint</label>
                <input id="endpoint" type="text" value={this.state.endpoint} onChange={this.onEndpointChange} />
              </p>
              <p>
                <label htmlFor="user-public-key">User Public Key</label>
                <input id="user-public-key" type="text" value={this.state.userPublicKey} onChange={this.onUserPublicKeyChange} />
              </p>
              <p>
                <label htmlFor="user-auth">User Auth</label>
                <input id="user-auch" type="text" value={this.state.userAuth} onChange={this.onUserAuthChange} />
              </p>
              <p>
                <label htmlFor="ttl">TTL</label>
                <input id="ttl" type="text" value={this.state.ttl} onChange={this.onTTLChange} />
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
