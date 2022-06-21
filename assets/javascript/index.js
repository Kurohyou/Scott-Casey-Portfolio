(async function(){
  const github = window.location.href.match(/github/);
  const prefix = github ? //Allows the js to pull from local version during development and the server version when live.
    'https://raw.githubusercontent.com/Kurohyou/Scott-Casey-Portfolio/main' :
    '';
  const papaConfig = {header:true};
  const data = await new Promise(resolve => {
    Papa.parse(`${prefix}/data/projects.csv?v=${siteVersion}`,{
      ...papaConfig,
      download:true,
      complete:results => resolve(results)
    });
  });
  const projectContainer = document.getElementById('projects');
  data.data.forEach((project)=>{
    if(!project.Name) return;
    console.log('project',project);
    const projectDiv = document.createElement('div');
    projectDiv.id = project.Name.replace(/\s+/g,'-');
    projectDiv.className = `project-div card--${project.cardType}`;

    const shadowDiv = document.createElement('div');
    shadowDiv.className = `shadow-container card--${project.cardType}`;
    const a = document.createElement('a');
    a.className = 'card';
    a.href = `#${projectDiv.id}`;
    const img = document.createElement('img');
    img.alt = project.imageAlt;
    img.src = `${prefix}/assets/images/${project.image}`;
    console.log('img',img);
    const head = document.createElement('h3');
    head.append(project.Name);
    const catSpan = document.createElement('span');
    const langSpan = document.createElement('span');
    catSpan.append(project.Categories);
    catSpan.className = 'categories';
    langSpan.className = 'languages';
    langSpan.append(project.Languages);
    shadowDiv.append(a);
    a.append(img,head,catSpan,langSpan);
    const detailDiv = document.createElement('div');
    projectDiv.append(shadowDiv);
    const linkDiv = document.createElement('div');
    linkDiv.className = 'linkDiv';
    projectDiv.append(linkDiv);
    ['siteLink','repositoryLink'].forEach((prop)=>{
      if(project[prop]){
        const labelA = document.createElement('a');
        labelA.href = project[prop];
        labelA.append(prop.replace(/Link/,' $&').replace(/^./,match => match.toUpperCase()));
        linkDiv.append(labelA);
      }
    });

    if(project.fullDescription){
      const paragraph = document.createElement('p');
      paragraph.append(project.fullDescription);
      projectDiv.append(paragraph);
    }

    projectContainer.append(projectDiv);
  });
})();