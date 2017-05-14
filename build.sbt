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

val playJson = Seq("com.typesafe.play" %% "play-json" % play.core.PlayVersion.current)
val webpush = Seq("nl.martijndwars" % "web-push" % "3.0.0")

lazy val domain = (project in file("modules/domain"))
  .settings(
    commonSettings ++ Seq(
      libraryDependencies := playJson
    )
  )

lazy val app = (project in file("modules/app"))
  .settings(commonSettings)
  .dependsOn(
    domain % "compile->compile;test->test",
    infra % "compile->compile;test->test"
  )
  .enablePlugins(PlayScala)

lazy val infra = (project in file("modules/infra"))
  .settings(
    commonSettings ++ Seq(
      libraryDependencies := webpush 
    )
  )
  .dependsOn(domain % "compile->compile;test->test")
