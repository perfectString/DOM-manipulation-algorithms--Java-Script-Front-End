function task(array){

let guildNumber = Number(array.shift())    
let guild = {}

for(i = 0 ; i < guildNumber; i++){

    const currentInfo = array.shift()


    const [name, role, skillsParts] = currentInfo.split(' ');


    const skills = skillsParts.split(',')

    guild[name] = {
        role: role,
        skills: skills,
    }
}

let currentCommand = array.shift()

while(currentCommand !== "End"){
    const tokens = currentCommand.split(' / ')

    const action = tokens[0]
    const name = tokens[1]

    switch(action){
        case "Perform":
           const role = tokens[2]
           const skill = tokens[3]

            const currentMember = guild[name]
            const isCorrectRole = currentMember.role === role
            const isSkilled = currentMember.skills.includes(skill)
            
           if(isCorrectRole && isSkilled){
            console.log(`${name} has successfully performed the skill: ${skill}!`)
           }
           else{
            console.log(`${name} cannot perform the skill: ${skill}.`)
           }
           

            break;
            
        case "Reassign":
            const newRole = tokens[2]

            guild[name].role = newRole
            console.log(`${name} has been reassigned to: ${newRole}`)
            break;

        case "Learn Skill":
            const newSkill = tokens[2]
            const member = guild[name]

            if(member.skills.includes(newSkill)){
                console.log(`${name} already knows the skill: ${newSkill}.`)
            }
            else{
                member.skills.push(newSkill)
                console.log(`${name} has learned a new skill: ${newSkill}.`)
            }
            break;

    }

    currentCommand = array.shift()
}

for (const name in guild) {
    const members = guild[name]
    const sortedSkills = members.skills
    .slice()
    .sort((a,b) => a.localeCompare(b))
    .join(', ')

    console.log(`Guild Member: ${name}, Role: ${members.role}, Skills: ${sortedSkills}`)
}

}

task([
  "3",
  "Arthur warrior swordsmanship,shield",
  "Merlin mage fireball,teleport",
  "Gwen healer healing,alchemy",
  "Perform / Arthur / warrior / swordsmanship",
  "Perform / Merlin / warrior / fireball",
  "Learn Skill / Gwen / purification",
  "Perform / Gwen / healer / purification",
  "Reassign / Merlin / healer",
  "Perform / Merlin / healer / teleport",
  "End"
]
)

/*
function task(array) {
  const guildNumber = Number(array.shift())
  const guild = {}

  for (let i = 0; i < guildNumber; i++) {
    const currentInfo = array.shift()
    const [name, role, skillsParts] = currentInfo.split(' / ')

    const skills = skillsParts.split(',')

    guild[name] = {
      role,
      skills
    };
  }

  let currentCommand = array.shift();

  while (currentCommand && currentCommand !== 'End') {
    const tokens = currentCommand.split(' / ')
    const action = tokens[0]
    const name = tokens[1]

    switch (action) {
      case 'Perform': {
        const role = tokens[2]
        const skill = tokens[3]

        const currentMember = guild[name];
        const isCorrectRole = currentMember.role === role
        const isSkilled = currentMember.skills.includes(skill)

        if (isCorrectRole && isSkilled) {
          console.log(`${name} has successfully performed the skill: ${skill}!`)
        } else {
          console.log(`${name} cannot perform the skill: ${skill}.`)
        }

        break;
      }

      case 'Reassign': {
        const newRole = tokens[2];

        guild[name].role = newRole
        console.log(`${name} has been reassigned to: ${newRole}`)

        break;
      }

      case 'Learn Skill': {
        const newSkill = tokens[2]
        const member = guild[name]

        if (member.skills.includes(newSkill)) {
          console.log(`${name} already knows the skill: ${newSkill}.`)
        } else {
          member.skills.push(newSkill);
          console.log(`${name} has learned a new skill: ${newSkill}.`)
        }

        break;
      }
    }

    currentCommand = array.shift()
  }

  for (const name of Object.keys(guild)) {
    const member = guild[name];

    const sortedSkills = member.skills
      .slice()
      .sort((a, b) => a.localeCompare(b))
      .join(', ')

    console.log(
      `Guild Member: ${name}, Role: ${member.role}, Skills: ${sortedSkills}`
    )
  }
}
*/