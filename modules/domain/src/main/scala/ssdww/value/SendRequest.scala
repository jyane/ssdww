package ssdww.value

import play.api.libs.json.{Json, OFormat}

case class SendRequest(
  endpoint: String,
  payload: String,
  publicKey: String,
  userAuth: String,
  ttl: Int
)

object SendRequest {
  implicit val format: OFormat[SendRequest] = Json.format[SendRequest]
}
