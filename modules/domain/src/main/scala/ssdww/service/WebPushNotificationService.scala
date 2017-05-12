package ssdww.service

import ssdww.value.SendRequest

trait WebPushNotificationService {
  def send(sendRequest: SendRequest): Unit
}
