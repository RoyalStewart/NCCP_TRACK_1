function peopleList_Controller($scope, $http, $timeout) {
    $scope.currentPerson = {
        'Name': '',
        'Title': '',
        'Affiliation': '',
        'Image': '',
        'Component': '',
        'Role': '',
        'PrimaryResearchAreas': '',
        'WebPage': '',
        'Email': '',
        'Class': ''
    };
    $scope.peopleList = [];

    $scope.initialize = function () {
        {% for person in People %}
            success(function (data) {
                $scope.peopleList = data;

                $.each(data, function (index, person) {
                    person.Image = StaticContentPath + person.Image;
                    person.Email = 'mailto:' + person.Email;
                    person.Class = '';
                });

                if (data.length > 0) {
                    $scope.currentPerson = data[0];
                    $scope.currentPerson.Class = 'MasterColumnSelected';
                }
            });
       {% endfor %}
    };

    $scope.personSelected = function (person) {
        $scope.currentPerson.Class = '';

        $scope.currentPerson = person;

        $scope.currentPerson.Class = 'MasterColumnSelected';

        $scope.$digest();
    };

    $scope.personMouseEnter = function (person) {
        if (person != $scope.currentPerson) {
            person.Class = 'MasterColumnHover';
        }
    };

    $scope.personMouseLeave = function (person) {
        if (person != $scope.currentPerson) {
            person.Class = '';
        }
    };
};
