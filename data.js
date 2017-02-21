var jsonfile = require('jsonfile-promised');
var fs = require('fs');
module.exports = {
    dataDir: `${__dirname}/data/`,
    coursesFile: `${__dirname}/data/courses.json`,
        getCoursesFromFile(file = this.coursesFile){
        return jsonfile.readFile(file);
    },
    addCourseToFile(course,file = this.coursesFile){
        jsonfile.readFile(file).then((courses) => {
            courses.push(course);
            jsonfile.writeFile(file,courses).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    },
    createNewCourseFile(courseFile){
        let emptyArray = [];
        return jsonfile.writeFile(courseFile,emptyArray, {spaces: 2}).then(() => {
            console.log('Arquivo criado');
        });
    },
    addTimeToExistingCourse(courseFile, time){
            let data = {
                ultimoEstudo: new Date().toString(),
                tempo: time
            };
            jsonfile.writeFile(courseFile, data, {spaces: 2})
                .then(() => {
                    console.log('Escrito no arquivo');
                }).catch((err) => {
                        console.log(err);
                });
    },
    getCourseData(course){
        const courseFile = this.dataDir + course + ".json";
        return jsonfile.readFile(courseFile);
    },
    logCourseTime(course,time){
        const courseFile = this.dataDir + course + ".json";
        if(fs.existsSync(courseFile)) {
            this.addTimeToExistingCourse(courseFile,time);
        }else{
            this.createNewCourseFile(courseFile).then(() => {
                this.addTimeToExistingCourse(courseFile,time);
            })
        }
    }
}
