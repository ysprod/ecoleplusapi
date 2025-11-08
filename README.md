<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API scolaire (ecoleplusapi) construite avec NestJS et Mongoose. Le projet inclut authentification JWT, gestion des étudiants, parents, enseignants, cantine, paiements, etc. Swagger est disponible sur `/api/docs`.

![CI](https://github.com/ysprod/ecoleplusapi/actions/workflows/ci.yml/badge.svg)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Déploiement sur Render

Ce dépôt inclut `render.yaml` pour provisionner un Web Service Node.js.

1. Crée le service Web sur Render à partir de ce repo GitHub.
2. Build command: `npm install && npm run build`
3. Start command: `npm run start:prod`
4. Le port est injecté dans `PORT` (déjà géré dans `src/main.ts`).
5. Health check: `/api/docs`.
6. Ajoute les variables d'environnement ci-dessous.

### Variables d'environnement

| Nom | Rôle | Exemple |
|-----|------|---------|
| PORT | Port interne fourni par Render | (automatique) |
| MONGODB_URI | Chaîne de connexion MongoDB | mongodb+srv://user:pass@cluster.mongodb.net |
| MONGODB_DB | Nom de la base | ecoleplus |
| JWT_SECRET | Secret signature JWT | chaîne longue aléatoire |
| ALLOWED_ORIGINS | Origines CORS autorisées | https://frontend.app,https://admin.app |
| API_URL | URL publique de l'API (Swagger) | https://ecoleplusapi.onrender.com |
| RESEND_API_KEY | Clé API pour emails (optionnel) | (clé) |

Fichier modèle disponible: `.env.example`.

### Politique CORS
`ALLOWED_ORIGINS` est parsé en liste. Assure-toi de mettre toutes les URLs (sans slash final) séparées par des virgules.

### Nettoyage du dépôt
`node_modules/` et `dist/` ne sont pas versionnés afin de réduire la taille et éviter les fichiers dérivés. La première réécriture de commit a permis d'enlever `node_modules` de l'historique.

### Conseils post-push
* Activer la protection de branche `main`.
* Ajouter des revues obligatoires avant merge.
* Surveiller la consommation MongoDB.
* Éventuellement ajouter un cache Redis (sessions / rate limit).
* Ajouter un job de tests (décommenter l'étape test dans `ci.yml`).

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
