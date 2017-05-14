import com.google.inject.AbstractModule
import ssdww.service.{WebPushNotificationService, WebPushNotificationServiceImpl}

class Module extends AbstractModule {
  def configure() = {
    bind(classOf[WebPushNotificationService]).to(classOf[WebPushNotificationServiceImpl])
  }
}