package ssdww.service

import java.nio.charset.StandardCharsets

import nl.martijndwars.webpush.{Notification, PushService, Utils}
import ssdww.value.SendRequest

import scala.io.Source

class WebPushNotificationServiceImpl extends WebPushNotificationService {
  private[this] def sendRequestToNotification(sendRequest: SendRequest): Notification = {
    new Notification(
      sendRequest.endpoint,
      Utils.loadPublicKey(sendRequest.publicKey),
      Utils.base64Decode(sendRequest.userAuth),
      sendRequest.payload.getBytes(StandardCharsets.UTF_8),
      sendRequest.ttl
    )
  }

  override def send(sendRequest: SendRequest): Unit = {
    val service = new PushService()
    val notification = sendRequestToNotification(sendRequest)
    val response = service.send(notification)
    val status = response.getStatusLine.getStatusCode
    val body = Source.fromInputStream(
      response.getEntity.getContent
    ).getLines().mkString("\n")
    println("status = " + status)
    println("body = " + body)
    ()
  }
}
