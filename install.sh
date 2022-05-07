username=$1
token=$2
repos=$3

echo "Currently downloading $repos from $username"

cd repos

git clone https://$token@github.com/$username/$repos.git

echo "Repos downloaded successfully"