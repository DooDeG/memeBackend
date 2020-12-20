composer install

cp .env.example .env

php artisan key:generate

php artisan jwt:secret

php artisan migrate --seed

#如果要重刷database
php artisan migrate:refresh --seed

php artisan storage:link