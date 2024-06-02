var express = require('express');
var app = express();
app.use(express.json());

var server = app.listen(3000, function(){console.log("Server is ON");});

const employers = [{id: 101, name: 'Bob Smith', department: 'Sales', salary: 70000},
{id: 102, name: 'Jack Johnson', department: 'Marketing', salary: 75000},
{id: 103, name: 'Sarah Connor', department: 'Human Resources', salary: 85000}];

app.get('/employers',(req, res)=>{
    res.send(employers);
});

app.post('/employers/add_employer', (req, res)=>{
    const employer = {
        id: req.body.id,
        name: req.body.name,
        department: req.body.department,
        salary: req.body.salary
    };
    employers.push(employer);
    res.status(200).send(employer);
});

app.patch('/employers/update_employer/:id', (req, res)=>{
    const employer = employers.find((element)=>{
        if (element.id === parseInt(req.params.id)) 
        {return true;}
        });
        if (employer) {
            for (let i in req.body){
            employer[i] = req.body[i];
        }
        return res.status(200).send(employer);
    }
    return res.status(404).send('Wrong ID, No employer Found');
});

app.delete('/employers/delete_employer/:id', (req, res)=>{

    const employer = employers.find((element)=>{
        if (element.id === parseInt(req.params.id)) 
            {return true;}
        });
    if(employer){
        const index = employers.indexOf(employer);
        employers.splice(index, 1);
        return res.status(200).send(employer);
    }
    return res.status(404).send('Wrong ID, No employer Found');
});