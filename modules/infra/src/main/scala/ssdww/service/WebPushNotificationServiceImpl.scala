package ssdww.service

import java.nio.charset.StandardCharsets

import nl.martijndwars.webpush.{Notification, PushService, Utils}
import org.bouncycastle.jce.provider.BouncyCastleProvider
import ssdww.value.SendRequest

class WebPushNotificationServiceImpl extends WebPushNotificationService {
  private[this] val privateKey = "ANEIgqVHKLBeP9tfaa90vKRssYwpNvyeY/ltoaA1LmfJ"
  private[this] val publicKey =
    "BPv+9Aue4F/hSokqWvvN9g3uzvKEzQe9Dp5BeU6QpIW+D0isuStITN+vIw0uvAGjC3iA5ycCF0EV4dlAtGrIGz4="

  java.security.Security.addProvider(new BouncyCastleProvider)

  private[this] def sendRequestToNotification(sendRequest: SendRequest): Notification =
    new Notification(
      sendRequest.endpoint,
      Utils.loadPublicKey(sendRequest.publicKey),
      Utils.base64Decode(sendRequest.userAuth),
      sendRequest.payload.getBytes(StandardCharsets.UTF_8),
      sendRequest.ttl
    )

  override def send(sendRequest: SendRequest): Unit = {
    val service = new PushService(publicKey, privateKey, "")
    val notification = sendRequestToNotification(sendRequest)
    val response = service.send(notification)
    val status = response.getStatusLine.getStatusCode
    println(response)
    println("status = " + status)
    ()
  }
}
