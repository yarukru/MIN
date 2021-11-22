var gulp = require('gulp');
    sass = require('gulp-sass');
    browserSync = require('browser-sync');
    concat      = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'); // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
    del         = require('del'); // Подключаем библиотеку для удаления файлов и папок
    imagemin    = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
    pngquant    = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
    cache       = require('gulp-cache'); // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', async function() { // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss') // Берем источник
        .pipe(sourcemaps.init())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', async function() {
	browserSync({
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});

gulp.task('scripts', async function() {
	return gulp.src(['app/js/main.js', 'app/js/vendor/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function() {
	return gulp.src('app/sсss/**/*.sсss') // Выбираем файл для минификации
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', async function() {
	return gulp.src('app/images/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/images')); // Выгружаем на продакшен
});
 
gulp.task('watch', async function() {
	gulp.watch('app/sсss/**/*.sсss', gulp.parallel('sass')); // Наблюдение за sass файлами
	gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch(['app/js/main.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('browser-sync', 'css-libs', 'sass', 'scripts', 'watch'));

//task for build in dist
gulp.task('prebuild', async function() {
 
	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		])
	.pipe(gulp.dest('dist/css'));
 
	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'));

	var buildIcons = gulp.src('app/icons/**/*') // Переносим иконочные шрифты в продакшен
		.pipe(gulp.dest('dist/icons'));
 
	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'));
 
	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
 
});
 
gulp.task('clear', async function (callback) {
	return cache.clearAll();
});
 
gulp.task('watch', async function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
	gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch(['app/js/main.js', 'app/vendor/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('css-libs', 'sass', 'scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));
