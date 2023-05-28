const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

const sass = require('gulp-sass')(require('node-sass'));
// const sass = require('gulp-sass');

const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');


gulp.task('css', async function(done){
    const rev = (await import('gulp-rev')).default;


    console.log('minifying css...');
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js', async function(done){
    const rev = (await import('gulp-rev')).default;
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('images', async function(done){
    const rev = (await import('gulp-rev')).default;
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', async function(done){
    // const del = (await import('del')).default;
    // console.log('del imported');
    // del.sync('./public/assets');
    // del.deleteAsync(['./public/assets'], { force:true });

    const directoryPath = ['./public/assets/js', './public/assets/css', './public/assets/images',];

    directoryPath.forEach((Path)=>{
        fs.readdir(Path, (err, files) => {
            if (err) {console.error('Error reading directory:', err);return;}
        
            files.forEach((file) => {
                const filePath = path.join(Path, file);
        
                fs.unlink(filePath, (err) => {
                if (err) {console.error('Error deleting file:', err);return;}
        
                console.log('File deleted:', filePath);
                });
            });
        });
    }); 

    if(fs.existsSync('./public/assets/rev-manifest.json')){
        fs.unlinkSync('./public/assets/rev-manifest.json');
    }; 
    
    if(fs.existsSync('./public/rev-manifest.json')){
        fs.unlinkSync('./public/rev-manifest.json');
    }
    
    done();
});

gulp.task('build', gulp.series('clean:assets', 'js', 'images'), function(done){
    console.log('Building assets....................');
    done();
});