## This is a script to invite big number of users to different slack channels based on 2 csv files (1: group names, 2: users + group names)

it can be complished in 5 steps, what I will explain below. at each step you have to call from terminal <i>\$node \<file name\> </i>

<b>! before running scripts install packages with <i> npm install</i> ! </b>

---

### 0.,convetFiles

create from groups.cvs file testgroups.json file (contains group names)
create from users.cvs file testusers.json file (contains user names, emails...)

#### call from terminal:

<i> node convertFiles.js </i>

#### returns:

testgroups.json
tetsusers.json

### 1.,createChannel

to create the required channels from testgroups.json file

#### call from terminal:

<i> node createChannel.js </i>

#### returns:

groupId.json containing group names + ids

#### attributes

<i>is_private:</i></br>

false creates public channels </br>
true creates private channels</br>

#### slack documentation:</br>

https://api.slack.com/methods/conversations.create

#### request / minute

20+

### 2.,createUsers

to create the required users from testusers.json file (contains first/last name, email, group name)

#### call from terminal:

<i> node createUsers.js </i>

#### returns:

userId.json containing user email, id and group name

#### slack documentation:</br>

https://api.slack.com/admins/scim#post-users

#### request / minute

180

### 3.,mergeReturnedData

merge the returned data from the two previous functions.

#### call from terminal:

<i> node mergeReturnedData.js </i>

#### returns:

mergedData.json

### 4.,inviteUsers

invite users to their groups, so they can see it when they enter the workspace

#### call from terminal:

<i> node inviteUsers.js </i>

#### slack documentation:</br>

https://api.slack.com/methods/conversations.invite

#### request / minute

50+
