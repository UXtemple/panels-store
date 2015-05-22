export default [{
  uri: 'https://uxtemple.com/',
  blocks: [{
    type: 'Title',
    data: {
      title: 'UXtemple'
    },
    style: {
      color: 'red'
    }
  }, {
    type: 'Action',
    data: {
      href: 'https://uxtepmle.com/the-team/',
      title: 'The team'
    }
  }]
}, {
  uri: 'https://uxtemple.com/the-team/',
  blocks: [{
    type: 'Team'
  }]
}, {
  uri: 'https://uxtemple.com/the-team/tom/',
  blocks: [{
    type: 'TeamMember',
    data: {
      name: 'Tom'
    }
  }]
}, {
  uri: 'https://uxtemple.com/the-team/dario/',
  blocks: [{
    type: 'TeamMember',
    data: {
      name: 'Dario'
    }
  }]
}];
