package controllers

import javax.inject._

import play.api.libs.json.{JsError, JsValue, Json}
import play.api.mvc._
import ssdww.service.WebPushNotificationService
import ssdww.value.SendRequest

@Singleton
class NotificationController @Inject() (
  webPushNotificationService: WebPushNotificationService
) extends Controller {
  def send(): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[SendRequest].map { sendRequest =>
      webPushNotificationService.send(sendRequest)
      Ok(Json.obj("result" -> sendRequest.toString))
    }.recoverTotal { e =>
      BadRequest(
        Json.obj(
          "error" -> "error",
          "detail" -> JsError.toJson(e)
        )
      )
    }
  }
}
