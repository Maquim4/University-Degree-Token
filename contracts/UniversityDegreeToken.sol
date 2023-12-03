// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

library Counters {
    struct Counter {
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

error UniversityDegree__NotOwner();
error UniversityDegree__YourDegreeNotIssued();
error UniversityDegree__ScoreTooHigh();

contract UniversityDegree is ERC721URIStorage {
    using Strings for uint256;
    // ERC721 Variables:
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Student{
        address studentAddress;
        string fullName;
        string degreeMajor;
        string degreeType;
        uint256 score;
        string degreeImage;
    }

    // Degree Variables:
    address private immutable i_owner; // Issuer of the degrees (the university)
    uint256 internal s_degreeMaxScore; 
    string internal s_degreeInProcess;
    mapping(address => bool) internal s_issuedDegrees;
    mapping(address => Student) internal s_adressToStudent;
    mapping(address => string) internal s_studentToDegree;
    Student [] public students;
    uint public studentsCount;

    // Events:
    event degreeIssued(address student);
    event degreeClaimed(address student, uint256 tokenId);
    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    // Modifiers:
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert UniversityDegree__NotOwner();
        }
        _;
    }

    constructor(
        uint256 degreeMaxScore, string memory degreeInProcess
    ) ERC721("UniversityDegreeSoulBoundToken", "UDSBT") {
        i_owner = msg.sender;
        s_degreeInProcess = degreeInProcess;
        s_degreeMaxScore = degreeMaxScore;
    }

    function issueDegree(address _student, string memory _degreeImage) external onlyOwner {
        s_issuedDegrees[_student] = true;
        Student storage student = s_adressToStudent[_student];
        student.degreeImage = _degreeImage;
        emit degreeIssued(_student);
    }

    function claimDegree() public returns (uint256) {
        if (!s_issuedDegrees[msg.sender]) {
            revert UniversityDegree__YourDegreeNotIssued();
        }

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        string memory tokenURI = generateTokenURI(
            newItemId,
            s_adressToStudent[msg.sender]
        );
        _setTokenURI(newItemId, tokenURI);

        s_issuedDegrees[msg.sender] = false;
        s_studentToDegree[msg.sender] = tokenURI;

        emit degreeClaimed(msg.sender, newItemId);

        return newItemId;
    }

    function generateTokenURI(
        uint256 tokenId,
        Student memory student
    ) private view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "', student.degreeMajor, ' Degree #', tokenId.toString(), '",',
                '"image": "', student.degreeImage, '",',
                '"description": "An award conferred by a college or university signifying that the recipient has satisfactorily completed a course of study",',
                '"attributes": [',
                    '{',
                        '"trait type": "Score",',
                        '"value": ', student.score.toString(), ',',
                        '"max_value": ', s_degreeMaxScore.toString(),
                    '},',
                    '{',
                        '"trait type": "Major",',
                        '"value": "', student.degreeMajor, '"',
                    '},',
                    '{',
                        '"trait type": "Type of degree",',
                        '"value": "', student.degreeType, '"',
                    '}',
                ']',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    // Getters
    function checkDegreeOfStudent(
        address student
    ) external view returns (string memory) {
        return s_studentToDegree[student];
    }

    function checkScoreOfStudent(
        address student
    ) public view returns (uint256) {
        return s_adressToStudent[student].score;
    }

    function isStudentDegreeIssued(
        address student
    ) public view returns (bool) {
        return s_issuedDegrees[student];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getTokenCounter() public view returns (Counters.Counter memory) {
        return _tokenIds;
    }

    function getDegreeMaxScore() public view returns (uint256) {
        return s_degreeMaxScore;
    }

    function createStudent(string memory _fullName, address _student, string memory _degreeMajor,
        string memory _degreeType,
        uint256 _score) external onlyOwner {
            if (_score > s_degreeMaxScore) {
            revert UniversityDegree__ScoreTooHigh();
        }
        Student memory student = Student({studentAddress: _student, fullName: _fullName, degreeMajor: _degreeMajor, degreeType: _degreeType, score: _score, degreeImage: s_degreeInProcess});
        students.push(student);
        s_adressToStudent[_student] = student;
        studentsCount++;
    }

    function updateStudentScore(address _student, uint256 _newScore) external onlyOwner {
        if (_newScore > s_degreeMaxScore) {
            revert UniversityDegree__ScoreTooHigh();
        }
        Student storage student = s_adressToStudent[_student];
        student.score = _newScore;
    }

    function getStudents() public view returns (Student[] memory){
        Student[] memory studs = new Student[](studentsCount);
        for (uint i = 0; i < studentsCount; i++) {
            Student storage st = students[i];
            studs[i] = st;
        }
      return studs;

    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256
    ) internal pure {
        require(
            from == address(0) || to == address(0),
            "Not allowed to transfer token"
        );
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }
}