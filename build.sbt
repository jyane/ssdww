val defaultScalacOptions = Seq(
  "-deprecation",
  "-feature",
  "-unchecked",
  "-Xlint",
  "-language:implicitConversions",
  "-Ywarn-dead-code",
  "-Ywarn-value-discard"
)

val commonSettings = Seq(
  scalaVersion := "2.11.11",
  scalacOptions ++= defaultScalacOptions
)

lazy val domain = (project in file("modules/domain"))
  .settings(commonSettings)

lazy val app = (project in file("modules/app"))
  .settings(commonSettings)
  .dependsOn(domain)
  .enablePlugins(PlayScala)
