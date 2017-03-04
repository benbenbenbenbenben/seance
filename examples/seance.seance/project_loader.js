given("seance")

  .ensure("Project")
  .has("location")
  .as("")

  .and
  .has("name")
  .as("new seance project")

  .and
  .has("tests")
  .of(Array)
  .as([])

  .and
  .has("mediums")
  .of(Array)
  .as([])

  .and
  .when(project => project.name = "")
  .throws(error => error.message == "Project.name must not be null, empty, or whitespace")

  .and
  .when(project => project.mediums.add("bogusmediumname"))
  .warns(warning => warning == "Could not find a medium, 'bogusmediumname'")
