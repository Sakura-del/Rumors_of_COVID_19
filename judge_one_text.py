import fasttext
import jieba. analyse

str="20%新冠男康复者精液中完全无精子，失去生育能力"  #这是我传给你的一句话

#加载那个1个多G的模型
model_path = './fasttext_model.pkl'
clf = fasttext.load_model(model_path)

#加载停用词表
stopwords=[]
for word in open('./stopwords.txt', "r", encoding='utf-8'):
    word=word.strip()
    stopwords.append(word)

#对输入的话进行分词处理
words=jieba.cut(str)
newstr = ""
for word in words:
    if word not in stopwords:
        newstr += word + " "
newstr=newstr[0:-1] #删除最后一个多余的空格

pred_res=clf.predict(newstr)
flag=pred_res[0][0] #预测的分类标签  __label__0表示假，即是谣言；__label__1表示真，即不是谣言
prob=pred_res[1][0] #属于该类别的概率
print(flag)
print(prob)