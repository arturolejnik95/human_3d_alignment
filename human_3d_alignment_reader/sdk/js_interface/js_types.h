#ifndef JS_TYPES_H_
#define JS_TYPES_H_

//TODO verify how much of this file is still needed (and why) for the most recent Framsticks SDK and Emscripten

#include <frams/_demos/genotypemini.h>
#include <frams/_demos/genotypeloader.h>
#include <common/virtfile/stdiofile.h>
#include <frams/model/modelparts.h>
#include <frams/genetics/genooperators.h>
#include <frams/genetics/preconfigured.h>
#include <frams/param/paramtree.h>
#include <frams/param/mutparamlist.h>
#include <frams/vm/classes/genoobj.h>
#include <frams/vm/classes/collectionobj.h>
#include <frams/vm/classes/3dobject.h>
#include <frams/neuro/neuroimpl.h>
#include <frams/neuro/neurofactory.h>
#include <frams/model/geometry/modelgeoclass.h>
#include <frams/model/modelobj.h>
#include <string>

#ifdef EMSCRIPTEN
typedef Model::ShapeType Model_ShapeType;
typedef Part::Shape Part_Shape;
typedef Joint::Shape Joint_Shape;
typedef LoggerBase::LoggerOptions LoggerBase_LoggerOptions;
typedef LoggerToMemory::Options2 LoggerToMemory_Options2;
typedef NeuroClass::Hint NeuroClass_Hint;

class SaveFileHelper
{
public:
	VirtFILE *Vfopen(const char* path, const char*mode)
	{
		return ::Vfopen(path, mode);
	}

	ParamEntry* getMinigenotype_paramtab()
	{
		return genotypemini_paramtab;
	}
};

struct XY
{
	XY() {}
	XY(int x, int y) : x(x), y(y) { }
	int x;
	int y;
};

struct XYWH : public XY
{
	XYWH() {}
	XYWH(int x, int y, int w, int h) : XY(x, y), w(w), h(h) { }
	int w;
	int h;
};

struct NNLayoutState_Model_Fred : public NNLayoutState_Model
{

	NNLayoutState_Model_Fred(Model *m) : NNLayoutState_Model(m) { }

	XY GetLinkValueXY(int el, int i)
	{
		int *ptr = NNLayoutState_Model::GetLinkXY(el, i);
		return XY(ptr[0], ptr[1]);
	}

	XYWH GetValueXYWH(int el)
	{
		int *ptr = NNLayoutState_Model::GetXYWH(el);
		return XYWH(ptr[0], ptr[1], ptr[2], ptr[3]);
	}

	virtual ~NNLayoutState_Model_Fred() { }

};

struct NNLayoutFunctionHelper {

	void doLayout(int layout_type, NNLayoutState *nn_layout)
	{
		nn_layout_functions[layout_type].doLayout(nn_layout);
	}

};

class GlyphLoader {
public:
	GlyphLoader() {}
	const char * getStringifiedGlyph(NeuroClass * cl)
	{
		int * glyph = cl->getSymbolGlyph();
		if (glyph == NULL) return "";
		std::string res = "";
		res += std::to_string(glyph[0]);
		for (int i = 1; i < glyph[0]; i++)
		{
			res += ",";
			res += std::to_string(glyph[i]);
		}
		return res.c_str();
	}
};

class ParamTreeConfigured
{
public:
	ParamTree * tree;
	MutableParamList paramiface;

	ParamTreeConfigured()
	{
		this->tree = generateTree();
	}

	~ParamTreeConfigured()
	{
		delete tree;
	}

	ParamTree * generateTree()
	{
		//StdioFILE::setStdio(); //setup VirtFILE::Vstdin/out/err
		PreconfiguredGenetics genetics;

		Param genotypemini_param(genotypemini_paramtab);
		NeuroFactory neurofac;
		neurofac.setStandardImplementation();
		NeuroNetConfig nn_config(&neurofac);
		ModelGeometry modelgeo;

		//MutableParamList combined;
		this->paramiface += &genetics.genman.par;
		this->paramiface += &GenoObj::getStaticParam();
		this->paramiface += &ModelObj::getStaticParam();
		this->paramiface += &VectorObject::getStaticParam();
		this->paramiface += &DictionaryObject::getStaticParam();
		this->paramiface += &Pt3D_Ext::getStaticParam();
		this->paramiface += &Orient_Ext::getStaticParam();
		this->paramiface += &genotypemini_param;
		this->paramiface += &nn_config.par;
		this->paramiface += &modelgeo.par;

		ParamTree * t = new ParamTree(&this->paramiface);
		return t;
	}
};

struct GenoOperatorsHelper
{
	GenoOperators* genoOper;

	char *lastMutate;
	char *lastCross1;
	char *lastCross2;

	GenoOperatorsHelper(GenoOperators *_genoOper)
	{
		lastMutate = nullptr;
		lastCross1 = nullptr;
		lastCross2 = nullptr;
		genoOper = _genoOper;
	}

	int mutate(const char *geno)
	{
		float _ch = 0;
		int _met = 0;

		if (lastMutate != nullptr) free(lastMutate);
		lastMutate = strdup(geno);
		return genoOper->mutate(lastMutate, _ch, _met);
	}

	const char* getLastMutateGeno()
	{
		return lastMutate;
	}

	int crossOver(const char *geno1, const char *geno2)
	{
		float _ch1 = 0;
		float _ch2 = 0;

		if (lastCross1 != nullptr) free(lastCross1);
		lastCross1 = strdup(geno1);

		if (lastCross2 != nullptr) free(lastCross2);
		lastCross2 = strdup(geno2);
		return genoOper->crossOver(lastCross1, lastCross2, _ch1, _ch2);
	}

	const char* getLastCrossGeno1()
	{
		return lastCross1;
	}

	const char* getLastCrossGeno2()
	{
		return lastCross2;
	}

	~GenoOperatorsHelper()
	{
		if (lastMutate != nullptr) free(lastMutate);
		if (lastCross1 != nullptr) free(lastCross1);
		if (lastCross2 != nullptr) free(lastCross2);
		//delete genoOper;
	}
};

#endif
#endif //JS_TYPES_H_
