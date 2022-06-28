export default class DataManager  {
  static instance = null;
  userID = "";
  curCategoryID ="";

  users = [
    {
      userID: 1,
      firstName: "Anita",
      lastName: "Furtado",
      DOB: "2022-02-04",
      email: "a@a.com",
      password: "12345",
    },
    {
      userID: 2,
      firstName: "Bob",
      lastName: "Smith",
      DOB: "2022-09-03",
      email: "b@b.com",
      password: "67890",
    },
  ];

  collections = [
    {
      collectionID: 1,
      userID: 1,
      name: "Trip to Sydney",
    },
    {
      collectionID: 2,
      userID: 1,
      name: "Camping",
    },
    {
      collectionID: 3,
      userID: 2,
      name: "Trip to Melbourne",
    },
    {
      collectionID: 4,
      userID: 2,
      name: "Star Gazing",
    },
  ]

  categories = [
    {
      categoryID: 1,
      userID: 1,
      name: "Beach"
    },
    {
      categoryID: 2,
      userID: 1,
      name: "Family"
    },
    {
      categoryID: 3,
      userID: 2,
      name: "Hiking"
    },
    {
      categoryID: 4,
      userID: 2,
      name: "Friends"
    },
    
  ]

  memories = [
    {
      memoryID: 1,
      title: "Beach Day",
      description: "We went to Mona Vale Beach today!",
      location: "Mona Vale, Sydney",
      date: "2022-11-02",
      categoryID: 1, 
      userID: 1,
      collectionID: 1,
      image: require("../assets/Beach.jpg"),
  
    },
    {
      memoryID: 2,
      title: "Camping",
      description: "Camping with the family!",
      location: "Middle of Nowhere, Sydney",
      date: "2022-10-02",
      categoryID: 2, 
      userID: 1,
      collectionID: 2,
      image: require("../assets/Camping.jpg"),
  
    },
    {
      memoryID: 3,
      title: "Hiking Day",
      description: "Hiking fun :)",
      location: "St Ives, Sydney",
      date: "2022-11-01",
      categoryID: 2, 
      userID: 1,
      collectionID: 1,
      image: require("../assets/Hiking.jpg"),
  
    },
    {
      memoryID: 4,
      title: "Star Gazing",
      description: "Look at the stars!",
      location: "Avalon, Sydney",
      date: "2022-07-04",
      categoryID: 4, 
      userID: 2,
      collectionID: 4,
      image: require("../assets/Star.jpg"),
  
    },
  ];

  static getInstance(){
      if(DataManager.instance==null){
          DataManager.instance =  new DataManager();
      }
      return this.instance;
  }

  //User Functions
  getUserID(){
      return this.userID;
  }

  setUserID(id){
    this.userID = id;
  }

  getCurCategoryID(){
    return this.curCategoryID;
  }

  setCurCategoryID(id){
    this.curCategoryID = id;
  }

  getCurUser(){
    return this.users.find((user) => user.userID === this.userID);
  }

  getUsers(){
    return this.users;
  }
  getUser(email){
    return this.users.find((user) => user.email === email);
  }

  userExists(email){
    return this.users.filter((user) => user.email === email).length>0;
  }

  addUser(user){
    this.users.push(user);
  }

  validateUser(email, password){
    return(
      this.users.filter(
        (user) => user.email === email && user.password === password
      ).length>0
    );
  }

  //Memory Functions
  getMemory(id){
      return this.getMemoriesForUser(this.userID).find((memory)=> memory.memoryID === id);
  }

  getMemoriesForUser(id){
    return this.memories.filter((memory)=> memory.userID === id);
  }

  getMemoriesForCollection(id){
    return this.getMemoriesForUser(this.userID).filter((memory)=> memory.collectionID === id);
  }

  getMemoriesForCategory(id){
    return this.getMemoriesForUser(this.userID).filter((memory)=> memory.categoryID === id);
  }

  getMemoriesForCollectionAndCategory(collectionID, categoryID){
    return this.getMemoriesForUser(this.userID).filter((memory)=> memory.collectionID === collectionID && memory.categoryID === categoryID);
  }

  addMemory(memory){
      this.memories.push(memory);
  }

  editMemory(id, newMemory){
    let originalMemory = this.getMemory(id);
    originalMemory.title = newMemory.title;
    originalMemory.description = newMemory.description;
    originalMemory.location = newMemory.location;
    originalMemory.date = newMemory.date;
    originalMemory.categoryID = newMemory.categoryID;
    originalMemory.collectionID = newMemory.collectionID;
    originalMemory.image = newMemory.image;
  }

  removeMemory(id){
    this.memories.splice(this.memories.indexOf(this.getMemory(id)), 1);
  }

  //Collection functions
  getCollection(id){
    return this.getCollectionsForUser(this.userID).find((collection)=> collection.collectionID === id);
  } 

  getCollectionsForUser(id){
    return this.collections.filter((collection)=> collection.userID === id);
  }

  getCollectionByName(name){
    return this.getCollectionsForUser(this.userID).find((collection)=> collection.name.toUpperCase() === name.toUpperCase());
  } 

  addCollection(collection){
      this.collections.push(collection);
  }

  //Category Functions
  getCategory(id){
    return this.getCategoriesForUser(this.userID).find((category)=> category.categoryID === id);
  } 

  getCategoriesForUser(id){
    return this.categories.filter((category)=> category.userID === id);
  }

  addCategory(category){
      this.categories.push(category);
  }

}