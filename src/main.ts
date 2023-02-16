import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'


async function bootstrap() {
   const app = await NestFactory.create(AppModule)
   const config = app.get(ConfigService)
   const port = config.get<number>('PORT') || 3070
   const frontEndAPI = config.get<string>('FRONT_END_API')

   app.enableCors({
      origin: [frontEndAPI],
   })

   await app.listen(port, () => console.log(`Server is listening port ${port}`))
}
bootstrap()
