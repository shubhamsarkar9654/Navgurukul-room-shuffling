const fs = require('fs');

const main_rooms_config = {
    room1: {
        beds: [1,2,3,4,5,6,7,8],
        students: ["akhilesh","bijendar","tarik","parabhakar","umesh","peter","bhupendar",1],
        shuffled_students: []
    },
    room6: {
        beds: [9,10,12,13,14,15,16,17,18],
        students: ["rajkumar","chandan","ranjan","ramesh","akash",2,3,4,5],
        shuffled_students: []
    },
    room7: {
        beds: [19,20,21,22,23,24,24,25],
        students: ["roshan","rajeshwar","santosh","kartik","deepak","bhaskar",6,7],
        shuffled_students: []
    },
    room8: {
        beds: [27,28,29,30,31],
        students: ["vishal_majundar","hemant","subdeep",10,11],
        shuffled_students: []
    },
    room9: {
        beds: [32,33],
        students: ["tushar",12],
        shuffled_students: []
    },
    room10: {
        beds: [34,35,36,37,38,39,40,41],
        students: ["ajit","riyaz","siddick","paritsoh","dhruv",13,14,15],
        shuffled_students: []
    },
    room11: {
        beds: [42,43,44,45],
        students: ["navid","baljeet",16,17],
        shuffled_students: []
    },
    room12: { 
        beds: [46,47,48,49,50,51,52,53,54,55],
        students: ["shubham","sonu","sampat","shankara","rohit",19,20,21,22,23],
        shuffled_students: []
    }
}

function roomShuffling(rooms_config) {
    for (room in rooms_config) {
        var [count,counter] = [0,0]
        while (rooms_config[room].shuffled_students.length !== rooms_config[room].beds.length) {
            const random_room = Object.keys(rooms_config)[Math.floor(Math.random()*Object.keys(rooms_config).length)]
            
            if (random_room !== room && rooms_config[random_room].students.length !== 0) {
                const random_student = rooms_config[random_room].students[Math.floor(Math.random()
                                        *rooms_config[random_room].students.length)]
                const filter_random_student =  typeof(random_student) !== "number" ? random_student : "empty"
                
                const bed_no = rooms_config[room].beds[count]
                const student_detail = {
                    name: filter_random_student,
                    bed_no: bed_no,
                    bed_position: bed_no%2 === 0 ? "upside_bed" : "downside_bed"
                }

                rooms_config[room].shuffled_students.push(student_detail)
                const random_student_index = rooms_config[random_room].students.indexOf(random_student)
                rooms_config[random_room].students.splice(random_student_index,1)
                count++
            }
            counter++
            if (counter>100) {
                return false
            }
        }
        delete rooms_config[room].beds
    }
    return rooms_config
}

while (true) {
    const copy_room_config = JSON.parse(JSON.stringify(main_rooms_config));
    const getFormFunction = roomShuffling(copy_room_config)
    if (getFormFunction)  {
        fs.writeFile("shuffle.json",JSON.stringify(getFormFunction,null,4),(err,) => {
            if(!err) {
                console.log('see json shuffling done......')
            }
        })
        break
    }
}


