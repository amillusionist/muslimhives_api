module.exports = ({ env }) => ({
    connection: {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST', '145.14.152.236'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'u878230863_muslimhives'),
        user: env('DATABASE_USERNAME', 'u878230863_muslimhives'),
        password: env('DATABASE_PASSWORD', 'Dj@ANONMOUS007'),
        ssl: {
          cs: env('DATABASE_CA')
        },
      },
      debug: false,
    },
  });