const nav_data = [
    {
        title:'হোম',
        id: 'home',
        icon: '<i class="icofont-home"></i>',
        link: '/'
    },
    {
        title: 'রক্ত',
        id: 'bloods',
        icon: '<i class="icofont-blood-drop"></i>',
        link: '/rank'
    },
    {
        title: 'পোস্ট',
        id: 'post',
        icon: '<i class="icofont-ui-add"></i>',
        link: '/post'
    },

    {
        title: 'মেম্বারস',
        id: 'members',
        icon: '<i class="icofont-users-social"></i>',
        link: '/members'
    },

]
const bottom_nav = document.querySelector('.bottom-nav');
nav_data.forEach(item => {
    bottom_nav.innerHTML += `
    <div id="${item.id}" class="nav">
    <div class="nav-icon">${item.icon}</div>
    <div id="${item.id}-title" class="nav-title">${item.title}</div>
</div>
    `
});

$('.nav').off().click(function(e){
    e.preventDefault();
  const id = $(this)[0].id;
  if(id==='home') router.navigate('/');
  else router.navigate('/'+id);
});
